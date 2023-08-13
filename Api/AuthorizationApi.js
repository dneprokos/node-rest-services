const axios = require('axios');
const envConfig = require('@env'); // Load environment variables from .env file

class AuthorizationApi {
    constructor() {
        this.instance = axios.create({
            baseURL: envConfig.baseURL,
            validateStatus: function (status) {
                return status >= 200 && status < 500;
            },
        });
    }

    /**
     * @description Get auth token for user. POST /api/authorization
     * @param {string} username
     * @param {string} password
     * @returns {Promise<{token: string}>}
     */
    async getAuthToken(username, password) {
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