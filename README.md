# box-functions

This sample demonstrates how to call Box APIs from a Box function using the [Box Node SDK](https://github.com/box/box-node-sdk).

#### Step 1. Create a Box application
1. Log into the [Box Developer Console](https://developers.box.com) in your Box developer account
2. Select "Create New App"
    * Select "Custom App" and press "Next"
    * Select "OAuth 2.0 with JWT (Server Authentication)" and press "Next"
    * Name the application "Box Function Sample - YOUR NAME"
        * *Application names must be unique across Box*
    * Press "Create App" and then "View Your App"
3. Press "Generate a Public/Private Keypair"
    * *You may need to enter a 2-factor confirmation code*
    * Save the JSON config file, which contains your application's secret key in the box-function-poc directory. We'll refer to the file as <env_config_file> when instructing to run the docker container in step 3 

#### Step 2. Authorize the application into your Box account
1. Log into your Box developer account as an admin and go to the [Apps Tab](https://app.box.com/master/settings/openbox) of Enterprise Settings
    * *Applications that use Server Authentication must be authorized by the admin of the enterprise*
2. Under "Custom Applications", press "Authorize New App"
3. Enter your "Client ID" from the developer console in the "API Key" field
4. Your application is now authorized to access your Box account!

#### Step 3. Create the Docker Container
Environment variables:
    * Paste the contents of your JSON config file into a new file. Edit the file to assign the `BOX_CONFIG` environment
    variable to the JSON string obtained (e.g. `BOX_CONFIG={ client_id : .... }` and save the file in the working directory 
        * *Storing the application config in an environment variable makes it easier to secure and manage*

Go to the directory that has your Dockerfile and run the following command to build the Docker image. The -t flag lets you tag
your image so it's easier to find later using the docker images command:

`docker build -t <username>/box-functions-poc .`

Run the image
Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag
redirects a public port to a private port inside the container. Run the image you previously built:

`docker run -p 49160:8080 -env_file=<env_config_file> -d <username>/box-functions-poc`

Note that `<env_config_file>` is the Box application config file that you created in step 1 pasting the value of the file obtained from Box and assigning it to the `BOX_CONFIG` variable and saved into the working
directory
    
#### Step 4. Test the Box function
1. Now you can call your app using curl (install if needed via: `sudo apt-get install curl`):

```$ curl -i localhost:49160

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-M6tWOb/Y57lesdjQuHeB1P/qTV0"
Date: Mon, 13 Nov 2017 20:53:59 GMT
Connection: keep-alive
```
   * The example Box function does not require any input, so curling a GET or POST with an empty body should work

2. The result should be similar to the following JSON response:

    ```JSON
    {
      "type": "user",
      "id": "12345678",
      "name": "Box Node Lambda Sample",
      "login": "AutomationUser_123456_A1Z2abcdef@boxdevedition.com",
      "created_at": "2017-01-25T15:39:38-08:00",
      "modified_at": "2017-01-25T17:21:56-08:00",
      "language": "en",
      "timezone": "America/Los_Angeles",
      "space_amount": 5368709120,
      "space_used": 0,
      "max_upload_size": 5368709120,
      "status": "active",
      "job_title": "",
      "phone": "",
      "address": "",
      "avatar_url": "https://xyz.app.box.com/api/avatar/large/12345678"
    }
    ```
    
3. Your Box function is sucessfully calling the Box API!

#### About the sample code
* This first section initializes the Box function (only run once):
    * First, it creates a `BoxSDK` object, initializing it with your application secrets from the `BOX_CONFIG` environment variable
    * Then, it creates a `BoxClient` object that obtains an access token for the Service Account in your Box enterprise
*  The Lambda's `handler` function will be called each time the Lambda function is invoked:
    * For this sample, the `handler` function simply retrieves info about the Service Account user and returns it as the response
    from the Lambda function

#### Modifying the sample code
You can edit the sample code directly in the inline editor in the Lambda Management Console.

If you need to add files or packages, you will need to rebuild the deployment package for the Lambda function:
1. `cd` into the `box-node-lambda-sample` directory
2. Run `npm install` to install the [Box Node SDK](https://github.com/box/box-node-sdk) 
3. Run `npm run zip` to create `box-node-lambda-sample.zip`
    * The ZIP file includes the sample code in `index.js` plus any modules in `node_modules`
4. Choose "Upload a .ZIP file" in the "Code entry type" drop-down button to load the new deployment package

#### Next steps
Now that you can call Box from your Box function, modify the sample Box function to make other Box API calls using the 
[Box Node SDK](https://github.com/box/box-node-sdk):

1. Create and view content owned by the service account

    ```Javascript
    client.folders.create(0, 'Test Folder', (err, result) => {...});
    client.folders.getItems(0, null, (err, result) => {...});
    ```
    
2. Create app users
    * Add the "Manage users" scope to the application in the Developer Console
    * Whenever you add scopes to your application, you need to re-authorize it in the Admin Console
    
    ```Javascript
    client.enterprise.addUser(null, 'Test App User', {is_platform_access_only: true}, (err, result) => {...});
    ```
    
3. Make API calls using a user's account
    * Add the "Generate User Access Tokens" scope to the application and re-authorize it in the Admin Console
    * Create a user client that makes API calls as a specific user
    
    ```Javascript
    const userClient = sdk.getAppAuthClient('user', user_id);
    userClient.folders.create(0, 'User Folder', (err, result) => {...});
    ```
    
4. Alternatively, you can make API calls on behalf of a user using the service account client
    * Add the "Perform Actions as Users" scope to the application and re-authorize it in the Admin Console
    * Use the `asUser()` and `asSelf()` functions to make API calls as a specific user
    
    ```Javascript
    client.asUser(user_id);
    client.folders.create(0, 'User Folder', (err, result) => {...});
    client.asSelf();
    ```

5. The standard used is that of [Google Cloud Functions](https://cloud.google.com/functions), which in turn uses [Express.js](https://expressjs.com/)

#### Troubleshooting
1. If your `clientID` is wrong, you will get: `"Please check the 'iss' claim."`
2. If your `enterpriseID` is wrong, you will get: `"Please check the 'sub' claim."`
3. If your `clientSecret` is wrong, you will get: `"The client credentials are invalid"`
4. If your `publicKeyID` is wrong, you will get: `"OpenSSL unable to verify data: "`
5. If your `privateKey` is wrong, you will get: `"OpenSSL unable to verify data: error:0906D06C:PEM routines:PEM_read_bio:no start line"`
6. If your `passphrase` is wrong, you will get: `"Error: error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt"`
7. If you pass an integer instead of a string for the `id` parameter of `getAppAuthClient()`, you wil get `"Please check the 'sub' claim."`
8. If you forgot to authorize the app, you wil get: `"This app is not authorized by the enterprise admin"`
9. If you get `"Task timed out after 3.00 seconds"`, you may be getting a network error or Box server error or a Timeout error from the box function framework
