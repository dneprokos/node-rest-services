const BaseApi = require('./_BaseApi');

class UsersApi extends BaseApi {
    constructor() {
        super();
    }

    /**
     * @description Get all users. GET /api/users
     * @returns {Promise<{users: Array}>}
     */
    async getUsers(authToken) {
        const response = await this.instance.get(
            `users`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`
                },
            }
        );

        return response;
    }

}

module.exports = UsersApi;