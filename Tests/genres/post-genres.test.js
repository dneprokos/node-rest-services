const { GenresApi } = require('@api');
const { TokenGenerator } = require('@testHelpers');

describe('POST /Genres - Tests', () => {
    let accessToken; // Declare a variable to store the access token
    let adminAccessToken; // Declare a variable to store the admin access token

    // Run this code before all tests in this describe block
    beforeAll(async () => {
        accessToken = await TokenGenerator.generateRegularUserAccessToken(); // Generate the access token
        adminAccessToken = await TokenGenerator.generateAdminUserAccessToken(); // Generate the admin access token
    });

    it('Create genre wtih non-admin token - Should be forbidden', async () => {
        //Arrange
        const genre = {
            "name": "Test"
        };

        //Act
        const response = await new GenresApi().createGenre(genre, accessToken);
        
        //Assert
        expect(response.status).toBe(403);
        expect(response.data).toBe('Your user role cannot perform this operation');
    });

    it('Create genre wtih admin token - Should be created', async () => {
        //Arrange
        const genre = {
            "name": "Test"
        };

        //Act
        const response = await new GenresApi().createGenre(genre, adminAccessToken);
        
        //Assert
        expect(response.status).toBe(201);
        expect(response.data.name).toBe(genre.name);
    });

    //Create test verifying that the genre name is required
    it('Create genre with empty name - Should be bad request', async () => {
        //Arrange
        const genre = {
            "name": ""
        };

        //Act
        const response = await new GenresApi().createGenre(genre, adminAccessToken);
        
        //Assert
        expect(response.status).toBe(400);
        expect(response.data).toBe(`"name" is not allowed to be empty`);
    });

    //Create test verifying that the genre name cannot be less than 3 characters
    it('Create genre with name less than 3 characters - Should be bad request', async () => {
        //Arrange
        const genre = {
            "name": "Te"
        };

        //Act
        const response = await new GenresApi().createGenre(genre, adminAccessToken);
        
        //Assert
        expect(response.status).toBe(400);
        expect(response.data).toBe(`"name" length must be at least 3 characters long`);
    });
});