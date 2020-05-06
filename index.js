/**
 * This sample demonstrates how to call Box APIs from a Box function using the Box Node SDK.
 *
 * For step-by-step instructions on how to create and authorize a Box application,
 * see https://developer.box.com/guides/applications/.
 */

'use strict';

const BoxSDK = require('box-node-sdk');

// Load the config from an environment variable for security and configuration management.
const boxConfig = JSON.parse(process.env.BOX_CONFIG);

const sdk = BoxSDK.getPreconfiguredInstance(boxConfig);

/**
 * Create a service account client that performs actions in the context of the specified
 * enterprise.  The app has a unique service account in each enterprise that authorizes the app.
 * The service account contains any app-specific content for that enterprise.
 * Depending on the scopes selected, it can also create and manage app users or managed users
 * in that enterprise.
 *
 * The client will automatically create and refresh the service account access token, as needed.
 */
const box = sdk.getAppAuthClient('enterprise');

/**
 *  YOUR CODE GOES HERE!!!
 *
 *  This sample function returns details of the current user (the service account).
 *  The syntax of the handler is made to work seamlessly on Google Cloud Functions, using Express.js (req, res) 
 */
exports.handler = (req, res) => {
    console.log('Event: ' + req.body);

    // Get details on the current user  (the service account)
    box.users.get(client.CURRENT_USER_ID, null, (err, result) => {
        let response;

        if (err) {
            if (err.response && err.response.body) {
                response = err.response.body;
            } else {
                response = err.toString();
            }
        } else {
            response = result;
        }

        console.log('Response: ' + response);
        res.status(200).send(response);
    });
};
