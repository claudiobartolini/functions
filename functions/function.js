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
 *  Example: the following Box function returns information about the user making the request
 *  exports.handler = (data, context) => {
 *      const boxClient = context.BoxClient;
 *      return boxClient.users.get(boxClient.CURRENT_USER_ID);
 *  }
 *
 * 
 */

exports.handler = (data, { boxClient }) => boxClient.folders.get('1')

