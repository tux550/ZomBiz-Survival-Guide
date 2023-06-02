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
# Config
from config import Config


# --------------------------------------------------
#                     App Config
# --------------------------------------------------
app  = Flask(__name__)
app.config['SECRET_KEY']               = Config.FLASK_SECRET_KEY
app.config ['SQLALCHEMY_DATABASE_URI'] = Config.DB_URI
cors = CORS(app, resources={
    r"/api/*": {"origins": Config.FRONTEND_ORIGIN}
})
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
stripe.api_key = Config.STRIPE_SECRET_KEY

# --------------------------------------------------
#                      Database
# --------------------------------------------------


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



class Subscription(db.Model):
    """ Subscription Model for storing suscription options """
    __tablename__ = "subscriptions"

    subscription_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title           = db.Column(db.String(255), unique=True, nullable=False)
    days            = db.Column(db.Integer, nullable=False)
    price           = db.Column(db.Numeric(5,2), nullable=False)

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



# ----- STRIPE ROUTES -------
@app.route("/api/payment/create-checkout-session", methods=["POST",])
@token_required
def create_checkout_session():
    # Get user email
    token = request.json.get('token')
    user_email = User.decode_auth_token(token)
    # Create session
    domain_url = Config.FRONTEND_ORIGIN
    try:
        # Docs: https://stripe.com/docs/api/checkout/sessions/create
        checkout_session = stripe.checkout.Session.create(
            success_url=domain_url + "/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=domain_url + "/cancelled",
            #client_reference_id=user_email, # Reference client by email
            payment_method_types=["card"],
            mode="payment",
            line_items=[
                {
                    "name": "T-shirt",
                    "quantity": 1,
                    "currency": "usd",
                    "amount": "2000",
                }
            ]
        )
        return jsonify({"sessionUrl": checkout_session["url"]})
    except Exception as e:
        return jsonify(error=str(e)), 404


# Run app
if __name__== '__main__':
    app.run(debug=True, use_reloader=True, port=4242)
