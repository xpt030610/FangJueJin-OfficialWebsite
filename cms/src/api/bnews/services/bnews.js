'use strict';

/**
 * bnews service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bnews.bnews');
