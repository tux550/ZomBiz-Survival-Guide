import React, { useState, useEffect } from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { redirect } from "react-router-dom";
import { Stack } from '@mui/material';
import {GetSubscriptions} from "../connections/Api"
import { SubsciptionButton } from './SubscriptionsButton';

/*
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
<button onClick={getSessionUrl()}> Pay </button>
*/

export default function SubscriptionsList() {

  const [subscriptions, setSubscriptions] = useState([])

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const data = await GetSubscriptions();
      setSubscriptions(data);
    }
    fetchSubscriptions();
  }, []);

  let sub_id = 0;

  return (
    <div>
      <Stack>
        {
          subscriptions.map((subs) => (
            <SubsciptionButton key={sub_id++} subscription={subs}>{subs}</SubsciptionButton>
          ))
        }
      </Stack >
    </div>
  )
}
