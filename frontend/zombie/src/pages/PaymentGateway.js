import React from 'react'
import { PaymentButton } from '../components/PaymentButton'
import config from "../config"

function PaymentGateway() {
  return (
    <div>
      PaymentGateway
      {config.api.host}
      <PaymentButton/>
    </div>
    
  )
}

export default PaymentGateway