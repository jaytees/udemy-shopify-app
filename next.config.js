require('dotenv').config();
const webpack = require('webpack');
// this file has access to the api key
const API_KEY = JSON.stringify(process.env.SHOPIFY_API_KEY);

// but because of server side rendering by next
// we need to give components access to the api key
// through this export
module.exports = {
  webpack: (config) => {
    const env = { API_KEY };
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  }
};
