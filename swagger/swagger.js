const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Resolve the path to the Swagger YAML file
const swaggerFilePath = path.resolve(__dirname, '../swagger.yml'); // Adjust the path as needed
const swaggerDocument = YAML.load(swaggerFilePath);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;