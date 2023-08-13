const { UsersApi } = require('@api'); 
const { TokenGenerator } = require('@testHelpers');

describe('GET /Users - Tests', () => {
    let accessToken; // Declare a variable to store the access token
    let adminAccessToken; // Declare a variable to store the admin access token

    // Run this code before all tests in this describe block
    beforeAll(async () => {
        accessToken = await TokenGenerator.generateRegularUserAccessToken(); // Generate the access token
        adminAccessToken = await TokenGenerator.generateAdminUserAccessToken(); // Generate the admin access token
    });
    
    it.skip('Users wtih non-admin token - Should be forbidden', async () => {
        //Arrange

        //Act
        const response = await new UsersApi().getUsers(accessToken);
        
        //Assert
        expect(response.status).toBe(403);
        expect(response.data).toBe('Your user role cannot perform this operation');
    });

    it('Users wtih admin token - Should return users', async () => {
        //Arrange
        const expectedUsers = [
            {
              "id": 1,
              "username": "testadmin",
              "password": "testadminpassword",
              "role": "admin"
            },
            {
              "id": 2,
              "username": "test",
              "password": "testpassword",
              "role": "member"
            }
        ];

        //Act
        const response = await new UsersApi().getUsers(adminAccessToken);
        
        //Assert
        expect(response.status).toBe(200);
        expect(response.data).toEqual(expectedUsers);
    });
});