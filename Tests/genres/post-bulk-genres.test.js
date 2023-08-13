const { GenresApi } = require('@api');
const { TokenGenerator } = require('@testHelpers');

describe('POST /Genres/Bulk - Tests', () => {
    let accessToken; // Declare a variable to store the access token
    let adminAccessToken; // Declare a variable to store the admin access token

    // Run this code before all tests in this describe block
    beforeAll(async () => {
        accessToken = await TokenGenerator.generateRegularUserAccessToken(); // Generate the access token
        adminAccessToken = await TokenGenerator.generateAdminUserAccessToken(); // Generate the admin access token
    });

    it('Create genre wtih non-admin token - Should be forbidden', async () => {
        //Arrange
        const genres = [
            {
                "name": "Test"
            }
        ];

        //Act
        const response = await new GenresApi().createGenres(genres, accessToken);
        
        //Assert
        expect(response.status).toBe(403);
        expect(response.data).toBe('Your user role cannot perform this operation');
    });

    it('Create genre wtih admin token - Should be created', async () => {
        //Arrange
        const genres = [
            {
                "name": "Test"
            },
            {
                "name": "Test 2"
            }
        ];

        //Act
        const response = await new GenresApi().createGenres(genres, adminAccessToken);
        
        //Assert
        expect(response.status).toBe(201);
        expect(response.data[0].name).toBe(genres[0].name);
        expect(response.data[1].name).toBe(genres[1].name);
    });
});