const { AuthorizationApi } = require('@api');
const envConfig = require('@env');

class TokenGenerator {
    static async generateAccessToken(username, password) {
        const response = await new AuthorizationApi().generateAuthToken(username, password);

        if (response.status === 200 && response.data.accessToken) {
            return response.data.accessToken;
        } else {
            throw new Error('Failed to generate access token');
        }
    }

    static async generateRegularUserAccessToken() {
        return TokenGenerator.generateAccessToken(envConfig.regularUser, envConfig.regularPassword);
    }

    static async generateAdminUserAccessToken() {
        return TokenGenerator.generateAccessToken(envConfig.adminUser, envConfig.adminPassword);
    }
}

module.exports = TokenGenerator;