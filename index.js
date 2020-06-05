/**
 * This sample demonstrates how to call Box APIs from a Box function using the Box Node SDK.
 *
 * For step-by-step instructions on how to create and authorize a Box application,
 * see https://developer.box.com/guides/applications/.
 */

'use strict';

const boxFunction = require('./functions/function');
const BoxSDK = require('box-node-sdk');

// Load the config from an environment variable for security and configuration management.

// TODO: const boxConfig = JSON.parse(process.env.BOX_CONFIG);
const fs = require('fs');
const dataBuffer = fs.readFileSync(process.env.BOX_CONFIG_FILE);
const dataJSON = dataBuffer.toString();
const boxConfig = JSON.parse(dataJSON);


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
const boxClient = sdk.getAppAuthClient('enterprise');

exports.handler = async (req, res) => {
    try {
        const result = await boxFunction.handler(req.body, { boxClient });
        return res.status(200).send(result)
    } catch (e) {
        if (!e.statusCode) {
            e.statusCode = 500;
        }
        return res.status(e.statusCode).send(e)
    }
};