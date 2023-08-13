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

    it('Send admin user auth-Admin user token should be returned', async () => {
        //Arrange

        //Act
        const response = await new AuthorizationApi()
            .getAuthToken(envConfig.adminUser, envConfig.adminPassword);
        
        //Assert
        expect(response.status).toBe(200);
        expect(response.data.accessToken).toBeDefined();
    });

    it('Send invalid user auth-404 should be returned', async () => {
        //Arrange

        //Act
        const response = await new AuthorizationApi()
            .getAuthToken("JonDou", "Password123");
        
        //Assert
        expect(response.status).toBe(404);
        expect(response.data).toBe('Invalid credentials.');
    });
});