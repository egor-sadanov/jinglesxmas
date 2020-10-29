/**
 * config.js
  */

'use strict';

// Load environment variables from the `.env` file.
require('dotenv').config();

module.exports = {
  // Default country for the checkout form.
  country: 'AU',

  // Store currency.
  currency: 'aud',

  paymentMethods: [
    'card'
  ],

  // Configuration for Stripe.
  stripe: {
    country: process.env.STRIPE_ACCOUNT_COUNTRY || 'AU',
    apiVersion: '2019-03-14',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },

  // Shipping options for the Payment Request API.
  shippingOptions: [
    {
      id: 'standard',
      label: 'Standard Shipping',
      detail: 'Weekdays and Weekends',
      amount: 2500,
    },
    {
      id: 'remote',
      label: 'Remote Suburbs Shipping',
      detail: 'Weekdays and Weekends',
      amount: 3500,
    },
    {
      id: 'cbd',
      label: 'CBD Shipping',
      detail: 'Weekdays and Weekends',
      amount: 5000,
    }
  ],

  // Server port.
  port: process.env.PORT || 8000,

  // Tunnel to serve the app over HTTPS and be able to receive webhooks locally.
  // Optionally, if you have a paid ngrok account, you can specify your `subdomain`
  // and `authtoken` in your `.env` file to use it.
  ngrok: {
    enabled: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 8000,
    subdomain: process.env.NGROK_SUBDOMAIN,
    authtoken: process.env.NGROK_AUTHTOKEN,
  },
    //Facebook authorization options and keys
  fb_strategy:{
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: "https://softbytes.au.ngrok.io/auth/facebook/callback",

    profileFields: ['id', 'displayName','email'],
    enableProof: true
  },
};
