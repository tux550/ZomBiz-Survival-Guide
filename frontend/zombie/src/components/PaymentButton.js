import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { redirect } from "react-router-dom";

async function getSessionUrl(subscription_id) {
  const response = await fetch(
    "http://127.0.0.1:4242/payment/create-checkout-session",
    {
      method: "POST"
    }
  );
  const jsonData = await response.json();
  if ("sessionUrl" in jsonData) {
    let stripe_url = jsonData["sessionUrl"];
    console.log(stripe_url);
    window.location = stripe_url;
  }
  else {
    console.log("Error creating stripe url");
  }
}


export const PaymentButton = () => {
  return (
    <div>
      <button onClick={getSessionUrl()}> Pay </button>
    </div>
  )
}
