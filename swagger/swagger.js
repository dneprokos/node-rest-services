const express = require('express');
const router = express.Router();

//Swagger
const swaggerUi = require('swagger-ui-express');
YAML = require('yamljs');
swaggerDocument = YAML.load('./swagger.yml');
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;