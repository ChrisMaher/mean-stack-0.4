'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Deal Schema
 */
var DealSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    link: {
        type: String,
        default: '',
        trim: true
    },
    details: {
        type: String,
        default: '',
        trim: true
    },
    retailer: {
        type: String,
        default: '',
        trim: true,
        required: 'Retailer cannot be blank'
    },
    price: {
        type: Number,
        default: 0.0,
        min: 0.0
    },
    imageUrl: {
        type: String,
        default: 'http://placehold.it/120x120'
    },
    tags: {
        type: String,
        default: '',
        trim: true
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    },
    votes: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }


});

mongoose.model('Deal', DealSchema);
