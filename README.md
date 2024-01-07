# node-rest-services
Just a simple test project with RESTful services build with node

![Swagger Image](/images/Swagger.png)  

# Pre-requisitions
1. Node Package Manager should be installed on your OS. Please find more detail here: https://www.npmjs.com/get-npm
2. Git project is downloaded
3. Open Command Line and run 'npm install or npm i'. (This step is required only first time when you've downloaded project)

# How to run
Run 'node index.js' in the Command Line or RunMe.bat if you are running it on Windows. 

Now you can use test endpoints

# Use of the real MongoDb
By default this project works with hardcoded list of data that exist only during the session. Anyway, there is possibility to enable connection to real Mongo database

## Precondition
1. Install MongoDb - https://www.mongodb.com/docs/manual/installation/
2. Create a server on your local machine. In the first stage, I installed it as a server with no username or password.
3. Create a database with a proper name. It can be any name, but at the moment in the configuration file it is equal to - "MoviesDb".
4. (Optional) There may be JSON files in the Mongo-import_data folder that you can import to get initial data.

## Change of the configuration
1. Go to config folder and update required configuration:
a) Update "mongoDB.uri". 
b) Set "useDatabase" to true

Note: I did a setup without authorization, but it maybe changed in the future. If you want to change, you may need to do it inside of the index.js file

![Report Image](/images/Configuration.png)

Now you need to return to "How to run" step and start application

# Swagger
Swagger is available after node app is started by the following path: http://localhost:3000/api-docs/

In order to use enpoints, you need to login with help of Bearer token. Login button available in Swagger right up corner.
In order to receive this token you need to send a request to Authorization endpoint by passing username and password parameters:

- Admin User Creds(All operations are available): <b>testadmin/testadminpassword</b>
- Regular User Creds(Only GET operations are available): <b>test/testpassword</b>

# How to run tests

API tests were created with a libraries Axios, Jest

1. Make sure you application is running
2. Define BASE_URL in .env file (If you have changed default port)
3. Open Command Line and run "npx jest" or "npm run test"
4. Report output can be defined in jest.config.js file. By default in test-reports folder

![Report Image](/images/Html_report.png)

