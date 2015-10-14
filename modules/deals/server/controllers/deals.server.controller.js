'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Deal = mongoose.model('Deal'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a deal
 */
exports.create = function (req, res) {
  var deal = new Deal(req.body);
  deal.user = req.user;

  deal.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(deal);
    }
  });
};

/**
 * Show the current deal
 */
exports.read = function (req, res) {
  res.json(req.deal);
};

/**
 * Update a deal
 */
exports.update = function (req, res) {
  var deal = req.deal;

  deal.title = req.body.title;
  deal.content = req.body.content;

  deal.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(deal);
    }
  });
};

/**
 * Delete an deal
 */
exports.delete = function (req, res) {
  var deal = req.deal;

  deal.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(deal);
    }
  });
};

/**
 * List of Deals
 */
exports.list = function (req, res) {
  Deal.find().sort('-created').populate('user', 'displayName').exec(function (err, deals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(deals);
    }
  });
};

/**
 * Deal middleware
 */
exports.dealByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Deal is invalid'
    });
  }

  Deal.findById(id).populate('user', 'displayName').exec(function (err, deal) {
    if (err) {
      return next(err);
    } else if (!deal) {
      return res.status(404).send({
        message: 'No deal with that identifier has been found'
      });
    }
    req.deal = deal;
    next();
  });
};
