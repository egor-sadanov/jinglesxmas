/**
 * setup.js
 * Stripe Payments Demo. Created by Romain Huet (@romainhuet)
 * and Thorsten Schaeff (@thorwebdev).
 *
 * This is a one-time setup script for your server. It creates a set of fixtures,
 * namely products and SKUs, that are used to create a random basket session.
 */

'use strict';

const config = require('./config');
const stripe = require('stripe')(config.stripe.secretKey);
stripe.setApiVersion(config.stripe.apiVersion);

// Store product list
const products = [
  {
    id: 'prod_IJj7l2rVzMfaXC',
    name: 'Tree 6',
    price: 10900,
    attributes: { issue: 'Fresh pine tree from Daylesford', 'size' : '6', addon : false}
  },
  {
    id: 'prod_IJj4eyw0urKfb1',
    name: 'Tree 7',
    price: 13900,
    attributes: {issue: 'Fresh pine tree from Daylesford', 'size' : '7', addon : false}
  },
  {
    id: 'prod_IJj7tjbVfgty7J',
    name: 'Cinco Stand',
    price: 4500,
    attributes: {issue: 'Made in USA', size: 'Standard',  'material' : 'polystyrene', addon : true}
  },
  {
    id: 'prod_IJj4MpVfOHsjuG',
    name: 'Large Cinco Stand',
    price: 6000,
    attributes: {issue: 'Made in USA', size: 'Standard', 'material' : 'polystyrene', addon : true}
  },
  {
    id: 'prod_IJw75RnppIFZpM',
    name: 'Tree Installtion',
    price: 2000,
    attributes: {set: 'Add on'}
  },
  {
    id: 'prod_IJj8xejfYwloc6',
    name: 'Watering Kit',
    price: 2500,
    attributes: {set: 'Add on'}
  },
  {
    id: 'prod_IJj8Dz3eLUcKTJ',
    name: 'Tree Disposal',
    price: 1500,
    attributes: {set: 'Add on'}
  },
  {
    id: 'prod_IJj83NN3LTVrfV',
    name: 'Tree Preservative',
    price: 500,
    attributes: {set: 'Add on'}
  }
];

// Creates a collection of Stripe Products and SKUs to use in your storefront
const createStoreProducts = async () => {
  try {
    const stripeProducts = await Promise.all(
      products.map(async product => {
        const stripeProduct = await stripe.products.create({
          id: product.id,
          name: product.name,
          type: 'good',
          attributes: Object.keys(product.attributes),
          metadata: product.metadata,
        });

        const stripeSku = await stripe.skus.create({
          product: stripeProduct.id,
          price: product.price,
          currency: config.currency,
          attributes: product.attributes,
          inventory: {type: 'infinite'},
        });

        return {stripeProduct, stripeSku};
      })
    );

    console.log(
      `🛍️  Successfully created ${stripeProducts.length} products on your Stripe account.`
    );
  } catch (error) {
    console.log(`⚠️  Error: ${error.message}`);
  }
};

// Creates a collection of Stripe Products and SKUs to use in your storefront
const createCoupon = async () => {
  try {
    // $20 coupon JINGLES2020
    const coupon = await stripe.coupons.create({
      id: 'JINGLES2020',
      name: 'JINGLES2020',
      amount_off: 2000,
      currency: config.currency,
      duration: 'forever',
    });

    console.log(
      `🛍️  Successfully created ${coupon} coupon on your Stripe account.`
    );
  } catch (error) {
    console.log(`⚠️  Error: ${error.message}`);
  }
};

createStoreProducts();
createCoupon();

