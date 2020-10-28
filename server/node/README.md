# JinglesXmas Node Server

This directory contains the main Node implementation of the payments server.

### Files Description

## auth.js
This script checks whether the user has been successfully authenticated and redirects him to main page

## config.js
This file contains all the keys necessary for connecting to Stripe, receiving webhooks and running ngrok

## inventory.js
This file contains methods for interacting with product list stored on stripe

## passport.js
Thi script handles facebook authentication

## routes.js
This file defines all the endpoints for the JinglesXmas app

## server.js
This is the main file starting the Express server and enabling ngrok.

## setup.js
This script creates product list on stripe 


### Running the Node Server

In a separate terminal window, start the local server:

    npm run start

Lastly, you will see the ngrok URL to serve our app via HTTPS. For example:

    https://<example>.ngrok.io

Use this URL in your browser to start the demo.

