const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const router = express.Router();

const file = fs.readFileSync(
  path.join(process.cwd(), 'public/swagger.yaml'),
  'utf8'
);
const swaggerDocument = YAML.parse(file);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

router.get('/swagger.json', (req, res) => res.json(swaggerDocument));

module.exports = router;
