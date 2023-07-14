import React, { useState, useEffect } from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { redirect } from "react-router-dom";
import { Stack } from '@mui/material';
import {GetSubscriptions} from "../connections/Api"
import { SubsciptionButton } from './SubscriptionsButton';
import Box from '@mui/material/Box';
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
      <header>
        <h1>Suscripciones</h1>
      </header>

     <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={2}
      borderRadius={8}
      bgcolor="#f0f0f0"
      maxWidth="50vw" // Set the maximum width to 50% of the viewport width
      width="100%" // Take up the full width of the parent container
      margin="0 auto" // Center the box horizontally
      marginTop="40px"
    >
      <Stack
      width="100%"
      spacing={2}>
        {
          subscriptions.map((subs) => (
            <SubsciptionButton key={sub_id++} subscription={subs}>{subs}</SubsciptionButton>
          ))
        }
      </Stack >
      </Box>
    </div>
  )
}
