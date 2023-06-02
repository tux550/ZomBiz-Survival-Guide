# This example sets up an endpoint using the Flask framework.
# Watch this video to get started: https://youtu.be/7Ul1vfmsDck.

import os
import stripe
from flask import Flask, redirect, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

stripe_keys = {
    "secret_key": os.environ["STRIPE_SECRET_KEY"],
    "publishable_key": os.environ["STRIPE_PUBLISHABLE_KEY"],
}

frontend = {
   "url" :  "http://127.0.0.1:3000/"
}

stripe.api_key = stripe_keys["secret_key"]

@app.route("/payment/create-checkout-session", methods=["POST",])
def create_checkout_session():
    domain_url = frontend["url"]
    stripe.api_key = stripe_keys["secret_key"]
    try:
        # Create new Checkout Session for the order
        # Other optional params include:
        # [billing_address_collection] - to display billing address details on the page
        # [customer] - if you have an existing Stripe Customer ID
        # [payment_intent_data] - capture the payment later
        # [customer_email] - prefill the email input in the form
        # For full details see https://stripe.com/docs/api/checkout/sessions/create
        # ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        checkout_session = stripe.checkout.Session.create(
            success_url=domain_url + "success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=domain_url + "cancelled",
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
        #return jsonify({"sessionId": checkout_session["id"]})
    except Exception as e:
        return jsonify(error=str(e)), 403
  
#@app.route("/payment/pub-key", methods=["POST",])
#def get_publishable_key():
#  stripe_config = {"publicKey": stripe_keys["publishable_key"]}
#  return jsonify(stripe_config)
#@app.route('/payment/secret')
#def secret():
#  intent = stripe.PaymentIntent.create(
#    amount=1099,
#    currency="usd",
#    payment_method_types=["card"],
#  )
#  return jsonify(client_secret=intent.client_secret)

if __name__== '__main__':
    app.run(port=4242)
