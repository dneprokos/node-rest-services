const config = require('config');

class BaseProvider {   
    constructor() {
      this.useDatabase = config.get('useDatabase');
    }
}

module.exports = BaseProvider;