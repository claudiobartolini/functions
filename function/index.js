/**
 * This sample demonstrates how to call Box APIs from a Box function using the Box Node SDK.
 *
 * For step-by-step instructions on how to create and authorize a Box application,
 * see https://developer.box.com/guides/applications/.
 */

'use strict';

/**
 * TODO: wrap the box configuration code into a proper module 
 * var client = require('box_functions');
 */
// var client = require('../box.js');

/**
 *  YOUR CODE GOES HERE!!!
 *
 *  This sample function returns details of the current user (the service account).
 *  The syntax of the handler is made to work seamlessly on Google Cloud Functions, using Express.js (req, res) 
 */
exports.handler = (req, res) => {
//    client.folders.get('0', null, (err, result) => {
        res.status(200).send('Hello new functions!');
//    });
};
