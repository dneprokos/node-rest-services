const { GenresApi } = require('@api');
const { TokenGenerator } = require('@testHelpers');

describe('GET /genres/search - Tests', () => {
    let accessToken; // Declare a variable to store the access token
    let adminAccessToken; // Declare a variable to store the admin access token

    // Run this code before all tests in this describe block
    beforeAll(async () => {
        accessToken = await TokenGenerator.generateRegularUserAccessToken(); // Generate the access token
        adminAccessToken = await TokenGenerator.generateAdminUserAccessToken(); // Generate the admin access token
    });

    it('Search genre with non-admin token - Should be found', async () => {
        //Arrange

        //Act
        const response = await new GenresApi().searchGenres(null, accessToken);
        
        //Assert
        expect(response.status).toBe(200);

        //TODO: Encapsulate assertions in a function
        expect(response.data).toHaveProperty('data');
        expect(Array.isArray(response.data.data)).toBe(true);

        // Assuming data array contains objects with id and name properties
        response.data.data.forEach(genre => {
            expect(genre).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String)
            }));
        });

        // Assuming data array contains objects with page_number, page_limit and total_results properties
        expect(response.data).toHaveProperty('page_number');
        expect(response.data).toHaveProperty('page_limit');
        expect(response.data).toHaveProperty('total_results');

        // Assuming page_number, page_limit and total_results properties are numbers with default values
        expect(response.data.page_number).toBe(1);
        expect(response.data.page_limit).toBe(10);
        expect(response.data.total_results).toBeGreaterThan(0);
    });

    it('Search genre with admin token - Should be found', async () => {
        //Arrange

        //Act
        const response = await new GenresApi().searchGenres(null, adminAccessToken);
        
        //Assert
        expect(response.status).toBe(200);

        //TODO: Add more assertions
    });
});