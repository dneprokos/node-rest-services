const { TokenGenerator } = require('@testHelpers');
const { MoviesApi } = require('../../Api');
const { MoviesProvider } = require('../../db_provider');

describe('POST /movies - Tests', () => {
    let accessToken; // Declare a variable to store the access token
    let adminAccessToken; // Declare a variable to store the admin access token

    // Run this code before all tests in this describe block
    beforeAll(async () => {
        accessToken = await TokenGenerator.generateRegularUserAccessToken(); // Generate the access token
        adminAccessToken = await TokenGenerator.generateAdminUserAccessToken(); // Generate the admin access token
    }, 10000);

    it('Create movie with non-admin token - Should be Forbidden', async () => {
        //Arrange
        const newMovie = {
            title: 'Whoopee!',
            release_date: 1930,
            genre_ids: [1,2]
        };

        //Act
        const response = await new MoviesApi().createMovie(newMovie, accessToken);

        //Assert
        expect(response.status).toBe(403);
        expect(await response.data).toBe('Your user role cannot perform this operation');
    });

    it('Create movie with admin token - Should be created', async () => {
        //Arrange
        const newMovie = {
            name: 'Whoopee!',
            release_date: 1930,
            genre_ids: [1,2]
        };

        //Act
        const response = await new MoviesApi().createMovie(newMovie, adminAccessToken);
        const responseBody = await response.data;

        //Assert
        expect(response.status).toBe(201);
        expect(responseBody).toMatchObject(newMovie);
        new MoviesProvider().getMovieById(responseBody.id).then((movie) => {
            expect(movie).toMatchObject(newMovie);
        });
    });

    it('Create movie with release date less than 1930 - Should be Bad Request', async () => {
        //Arrange
        const newMovie = {
            name: 'Whoopee!',
            release_date: 1929,
            genre_ids: [1,2]
        };

        //Act
        const response = await new MoviesApi().createMovie(newMovie, adminAccessToken);

        //Assert
        expect(response.status).toBe(400);
        expect(await response.data).toBe('"release_date" must be larger than or equal to 1930');
    });

});