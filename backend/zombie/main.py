# Modules
import stripe
import jwt
import datetime
from functools import wraps
# Flask Imports
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_serialize import FlaskSerialize
# Config
from config import Config


# --------------------------------------------------
#                     App Config
# --------------------------------------------------
app  = Flask(__name__)
app.config['SECRET_KEY']               = Config.FLASK_SECRET_KEY
app.config ['SQLALCHEMY_DATABASE_URI'] = Config.DB_URI
CORS(app)
#cors = CORS(app, resources={
#    r"/api/*": {"origins": Config.FRONTEND_ORIGIN}
#})
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
fs_mixin = FlaskSerialize(db)
stripe.api_key = Config.STRIPE_SECRET_KEY

# --------------------------------------------------
#                      Database
# --------------------------------------------------

class InterestLocation(db.Model):
    """  """
    __tablename__ = "interest_location"

    location_id     = db.Column(db.Integer, primary_key=True, autoincrement=True)
    is_marker       = db.Column(db.Boolean, unique=False, nullable=False, default=False)
    zone            = db.Column(db.Integer, nullable=False)
    longitude       = db.Column(db.Float, nullable=False)
    latitude        = db.Column(db.Float, nullable=False)
    danger_level    = db.Column(db.String(30), nullable=False)
    description     = db.Column(db.String(300), nullable=False)

    def __init__(self, is_marker, lng, lat, danger, desc):
        self.is_marker = is_marker
        self.longitude = lng
        self.latitude = lat
        self.danger_level = danger
        self.description = desc


class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "users"

    user_id               = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email                 = db.Column(db.String(255), unique=True, nullable=False)
    password              = db.Column(db.String(255), nullable=False)
    subscription_expires  = db.Column(db.String(255), nullable=False)

    def __init__(self, email, password):
        self.email                = email
        self.password             = bcrypt.generate_password_hash(password).decode("utf-8")
        self.subscription_expires = datetime.datetime.now()

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password) 

    def encode_auth_token(self):
        token = jwt.encode(
            {
                "sub" : self.email,
                "exp" : datetime.datetime.utcnow() + datetime.timedelta(days=1),
                "iat" : datetime.datetime.utcnow(),
            },
            app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
        return token

    @staticmethod
    def decode_auth_token(auth_token):
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'), algorithms=['HS256',])
        return payload['sub']



class Subscription(db.Model, fs_mixin):
    """ Subscription Model for storing suscription options """
    __tablename__ = "subscriptions"

    subscription_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title           = db.Column(db.String(255), unique=True, nullable=False)
    days            = db.Column(db.Integer, nullable=False)
    price           = db.Column(db.Integer, nullable=False)

    def __init__(self, title, days, price):
        self.title = title
        self.days  = days
        self.price = price

class SubscriptionHistory(db.Model):
    """ SubscriptionHistory Model for storing relation User-Subscription"""
    __tablename__ = "subscriptions_history"

    subscriptions_history_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id                  = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    subscription_id          = db.Column(db.Integer, db.ForeignKey('subscriptions.subscription_id'))
    purchase_date            = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id, subscription_id):
        self.user_id          = user_id
        self.subscription_id  = subscription_id
        self.purchase_date    = datetime.datetime.now()

# Create db
with app.app_context():
    db.create_all()

# --------------------------------------------------
#                      Routes
# --------------------------------------------------

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.json.get('token')
        if not token:
            return jsonify({"message":"Token is missing"}), 403
        try:
            user_email = User.decode_auth_token(token)
        except:
            return jsonify({"message":"Token is invalid"}), 403
        return f(*args, **kwargs)
    return decorated

@app.route("/api/auth/login", methods=["POST",])
def login():
    data = request.json
    
    email    = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first_or_404()
    
    if user.check_password(password):
        token = user.encode_auth_token()
        return jsonify( {"token":token} )
    else:
        abort(404)

@app.route("/api/auth/register", methods=["POST",])
def register():
    data = request.json
    
    email    = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    
    if user:
        # User already exists
        abort(404)
    else:
        # Create user
        new_user = User(email,password)
        db.session.add(new_user)
        db.session.commit()
        # Return token
        token = new_user.encode_auth_token()
        return jsonify( {"token":token} )


# -----      API      -------


@app.route("/api/resources/subscriptions/<int:subs_id>", methods=["GET",])
@app.route("/api/resources/subscriptions", methods=["GET",])
def get_subscriptions(subs_id=None):
    return Subscription.fs_get_delete_put_post(subs_id)

# ----- STRIPE ROUTES -------
@app.route("/api/payment/create-checkout-session", methods=["POST",])
@token_required
def create_checkout_session():
    # Get user email
    print("SSS")
    token = request.json.get('token')
    user_email = User.decode_auth_token(token)
    # Get subscription
    subscription_id = request.json.get('subscription_id')
    subscription = Subscription.query.get_or_404(subscription_id)
    print("TRY")
    # Create session
    domain_url = Config.FRONTEND_ORIGIN
    try:
        # Docs: https://stripe.com/docs/api/checkout/sessions/create
        checkout_session = stripe.checkout.Session.create(
            success_url=domain_url + "/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=domain_url + "/cancelled",
            client_reference_id=user_email, # Reference client by email
            payment_method_types=["card"],
            mode="payment",
            line_items=[
                {
                    "name": subscription.title,
                    "quantity": 1,
                    "currency": "usd",
                    "amount": subscription.price * 100,
                }
            ],
            metadata={
                "subscription":subscription_id
            }
        )
        return jsonify({"sessionUrl": checkout_session["url"]})
    except Exception as e:
        return jsonify(error=str(e)), 404

@app.route("/api/payment/checkout-webhook", methods=['POST',])
def webhook_checkout_session():
    #print("Webhook")
    payload = request.data
    sig_header = request.headers['STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, Config.STRIPE_ENDPOINT_SECRET
        )
    except ValueError as e:
        #print("Weebhook Invalid Payload")
        return "Invalid payload", 400
    except stripe.error.SignatureVerificationError as e:
        #print("Weebhook Invalid Signature")
        return "Invalid signature", 400
    
    if event["type"] == "checkout.session.completed":
        #print(event["data"])
        # Handle event
        checkout = event["data"]["object"]
        # Extract data
        user_email = checkout["client_reference_id"]
        subscription_id = checkout["metadata"]["subscription"]
        # Get DB object
        user         = User.query.filter_by(email=user_email).first_or_404()
        subscription = Subscription.query.get_or_404(subscription_id)
        # Update database
        sh   = SubscriptionHistory(user.email, subscription.subscription_id) # Create in history
        user.subscription_expires = datetime.datetime.now() + datetime.timedelta(days=subscription.days) # Update user
        db.session.add(sh)
        # Commit
        db.session.commit()
    return "Success", 200


# Run app
if __name__== '__main__':
    app.run(debug=True, use_reloader=True, port=4242)
