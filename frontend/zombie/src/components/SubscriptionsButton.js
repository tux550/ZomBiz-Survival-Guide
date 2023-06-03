import { Button } from '@mui/material';
import React from 'react'
import {GetSubscriptionCheckoutSession} from "../connections/Api"

function createSession (subscription_id) {
  GetSubscriptionCheckoutSession(subscription_id);
}

export const SubsciptionButton = ({subscription}) => {
    return (
        <div>
          <Button fullWidth onClick={()=>{createSession(subscription.subscription_id)}}> {subscription.title} </Button>
        </div>
    );
}