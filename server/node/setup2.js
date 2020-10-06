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

// Replace this list with information about your store's products.
const products = [
  {
    id: 'tree_6',
    name: 'Tree 6',
    price: 89,
    attributes: { issue: 'Fresh pine tree from Daylesford', 'size' : '6', addon : false}
  },
  {
    id: 'tree_7',
    name: 'Tree 7',
    price: 139,
    attributes: {issue: 'Fresh pine tree from Daylesford', 'size' : '7', addon : false}
  },
  {
    id: 'tree_8',
    name: 'Tree 8',
    price: 139,
    attributes: {issue: 'Fresh pine tree from Daylesford', 'size' : '8', addon : false}
  },
  {
    id: 'stand_std',
    name: 'Cinco Stand',
    price: 49,
    attributes: {issue: 'Made in USA', size: 'Standard',  'material' : 'polystyrene', addon : true}
  },
  {
    id: 'stand_lrg',
    name: 'Large Cinco Stand',
    price: 69,
    attributes: {issue: 'Made in USA', size: 'Standard', 'material' : 'polystyrene', addon : true}
  },
  {
    id: 'installation',
    name: 'Tree Installtion',
    price: 15,
    attributes: {set: 'Add on'}
  },
  {
    id: 'removal',
    name: 'Tree Disposal',
    price: 15,
    attributes: {set: 'Add on'}
  },
  {
    id: 'preservative',
    name: 'Tree Preservative',
    price: 5,
    attributes: {set: 'Add on'}
  },
  {
    id: 'watering',
    name: 'Watering Kit',
    price: 15,
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

createStoreProducts();
