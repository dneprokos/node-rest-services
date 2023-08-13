// Tests for POST - Authorization API
const { AuthorizationApi } = require('@api'); 
const envConfig = require('@env');

describe('POST - Authorization API Tests', () => {
    it('Send non-admin user auth-Non admin user token should be returned', async () => {
        //Arrange

        //Act
        const response = await new AuthorizationApi()
            .getAuthToken(envConfig.regularUser, envConfig.regularPassword);
        
        //Assert
        expect(response.status).toBe(200);
        expect(response.data.accessToken).toBeDefined();
    });
});