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

