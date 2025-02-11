/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
/// <reference types="cypress" />

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const dotenv = require('dotenv');
const path = require('path');

const awsConfig = require(path.join(__dirname, '../../src/aws-exports.js'));

dotenv.config();

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // if (config.testingType === 'component') {
  //   // eslint-disable-next-line
  //   require('@cypress/react/plugins/react-scripts')(on, config);
  // }

  config.env.cognito_username = process.env.AWS_COGNITO_USERNAME;
  config.env.cognito_password = process.env.AWS_COGNITO_PASSWORD;
  config.env.awsConfig = awsConfig.default;

  // plugins code ...

  return config;
};
