const { TokenGenerator } = require('@testHelpers');
const { MoviesApi } = require('../../Api');
const { MoviesProvider } = require('../../db_provider');
const defaultValues = require('../../TestHelpers/defaultValues');

describe('GET /movies - Tests', () => {
    let accessToken; // Declare a variable to store the access token
    //let adminAccessToken; // Declare a variable to store the admin access token

    // Run this code before all tests in this describe block
    beforeAll(async () => {
        accessToken = await TokenGenerator.generateRegularUserAccessToken(); // Generate the access token
        //adminAccessToken = await TokenGenerator.generateAdminUserAccessToken(); // Generate the admin access token
    });

    it('Search movie with non-admin token - Should be found', async () => {
        //Arrange
        const allDbMovies = await new MoviesProvider().getAllMovies();

        //Act
        const response = await new MoviesApi().getMovies(accessToken, null);
        const responseBody = await response.data;
        
        //Assert
        expect(response.status).toBe(200);
        expect(responseBody.data).toEqual(allDbMovies);
        expect(responseBody.page_number).toBe(defaultValues.DEFAULT_PAGE_NUMBER);
        expect(responseBody.page_limit).toBe(defaultValues.DEFAULT_PAGE_LIMIT);
        expect(responseBody.total_results).toBe(allDbMovies.length);
    });

    it('Search movie with admin token - Should be found', async () => {
        //Arrange
        const allDbMovies = await new MoviesProvider().getAllMovies();

        //Act
        const response = await new MoviesApi().getMovies(accessToken, null);
        const responseBody = await response.data;
        
        //Assert
        expect(response.status).toBe(200);
        expect(responseBody.data).toEqual(allDbMovies);
        expect(responseBody.page_number).toBe(defaultValues.DEFAULT_PAGE_NUMBER);
        expect(responseBody.page_limit).toBe(defaultValues.DEFAULT_PAGE_LIMIT);
        expect(responseBody.total_results).toBe(allDbMovies.length);
    });

    it.each([
        [ 1, 2 ],
        [ 2, 2 ]
      ])('Search movie with page: %s and limit: %s - Should be found', async (page, limit) => {
        // Your test code
        //Arrange
        const allDbMovies = await new MoviesProvider().getAllMovies();
        const expectedMovies = allDbMovies.slice((page - 1) * limit, page * limit);
      
        //Act
        const response = await new MoviesApi().getMovies(accessToken, { page, limit });
        const responseBody = await response.data;
      
        //Assert
        expect(response.status).toBe(200);
        expect(responseBody.data).toEqual(expectedMovies);
        expect(responseBody.page_number).toBe(page);
        expect(responseBody.page_limit).toBe(limit);
        expect(responseBody.total_results).toBe(allDbMovies.length);
      });

    it.each([
        0,
        -1
    ])(`Search movie with invalid page: %s - Should return error`, async (page) => {
        //Arrange

        //Act
        const response = await new MoviesApi().getMovies(accessToken, { page });
        const responseBody = await response.data;

        //Assert
        expect(response.status).toBe(400);
        expect(responseBody).toBe(defaultValues.PAGE_GREATER_THEN_ZERO_MESSAGE);
    });

    it.each([
        0,
        -1
    ])(`Search movie with invalid limit: %s - Should return error`, async (limit) => {
        //Arrange

        //Act
        const response = await new MoviesApi().getMovies(accessToken, { limit });
        const responseBody = await response.data;

        //Assert
        expect(response.status).toBe(400);
        expect(responseBody).toBe(defaultValues.LIMIT_GREATER_THEN_ZERO_MESSAGE);
    });
});