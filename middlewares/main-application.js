const config = require('config');
const open = require('open');

function startApplication(app) {
    const port = config.get('port') || 4000;
    const swaggerUrl = `http://localhost:${port}/api-docs/`;
    app.listen(port, () => console.log(`Listening on port ${port}...
    Swagger available by the following url: ${swaggerUrl}`));
    if (config.get('open_swagger')) {
        open(`${swaggerUrl}`);
    }
}

module.exports = { startApplication }