const BaseApi = require('./_BaseApi');

class AuthorizationApi extends BaseApi {
    constructor() {
        super();
    }

    /**
     * @description Generate auth token for user. POST /api/authorization
     * @param {string} username
     * @param {string} password
     * @returns {Promise<{token: string}>}
     */
    async generateAuthToken(username, password) {
        const response = await this.instance.post(
            `authorization?username=${username}&password=${password}`,
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        );

        return response;
    }
}

module.exports = AuthorizationApi;