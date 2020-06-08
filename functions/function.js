/**
 * This sample demonstrates how to call Box APIs from a Box function using the Box Node SDK.
 *
 * For step-by-step instructions on how to create and authorize a Box application,
 * see https://developer.box.com/guides/applications/.
 */

'use strict';

/**
 *  YOUR CODE GOES HERE!!!
 *
 *  This sample function returns details of the current user (the service account). 
 *  The return syntax of the handler is made to work seamlessly on Google Cloud Functions, using Express.js (req, res)
 * 
 *. exports.handler = (data, context, callback)
 *  
 *  Following https://cloudevents.io specification
 *  @param {object} data The event payload (body of the request invocation via the API Gateway)
 *  @param {object} context The event metadata: contextual information from logging and tracing
 *  in particular,  *  @param {object} context.boxClient is a box SDK client initialized with the context for the function (see documentation) 
 * 
 *  'require'-ing local modules is permitted: both from a relative ('./some-module-here') or absolute ('/home/project/some-other-module)
 *  var utils = require(./utils)
 * 
 *  'require-ing' npm modules is ok too
 *  var validator = require(./validator)
 *  TODO: this doesn't work just yet locally - but the would work in a production development e.g. onto Google Cloud Functions or Heroku 
 * 
 *  Example: the following Box function returns information about the user making the request
 *  exports.handler = (data, context) => {
 *      const boxClient = context.BoxClient;
 *      return boxClient.users.get('me');
 *  }
 * 
 *  Enjoy!
 */

exports.handler = (data, { boxClient }) => {
    return boxClient.users.get('me')
}