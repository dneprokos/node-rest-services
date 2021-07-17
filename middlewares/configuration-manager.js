const express = require('express');
const app = express();
const morgan = require('morgan');

function runConfiguration() {
    if (app.get('env') === 'development') {
        console.log('Development config was used');
        app.use(morgan('tiny')); //TODO: Ignore sensitive data. Look at skip property and function
        console.log('Morgan is used');
    }
}

module.exports = runConfiguration;
