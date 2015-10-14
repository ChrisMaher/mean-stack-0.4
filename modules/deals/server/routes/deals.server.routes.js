'use strict';

/**
 * Module dependencies.
 */
var dealsPolicy = require('../policies/deals.server.policy'),
  deals = require('../controllers/deals.server.controller');

module.exports = function (app) {
  // Deals collection routes
  app.route('/api/deals').all(dealsPolicy.isAllowed)
    .get(deals.list)
    .post(deals.create);

    

  // Single deal routes
  app.route('/api/deals/:dealId').all(dealsPolicy.isAllowed)
    .get(deals.read)
    .put(deals.update)
    .delete(deals.delete);

  // Finish by binding the deal middleware
  app.param('dealId', deals.dealByID);
};
