const BaseApi = require('./_BaseApi');

class MoviesApi extends BaseApi {
    constructor() {
        super();
    }

    /**
     * @description Get all movies with filter. GET /api/movies
     * @returns {Promise<{movies: Array}>}
     */
    async getMovies(authToken, queryParams = {}) {
        const response = await this.instance.get(
            `movies`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`
                },

                params: queryParams
            }
        );

        return response;
    }

    /**
     * @description Get a movie by id. GET /api/movies/:id
     * @param {number} id
     * @returns {Promise<{movie: Object}>}
     */
    async getMovieById(id, authToken) {
        const response = await this.instance.get(
            `movies/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`
                },
            }
        );

        return response;
    }

    /**
     * @description Create a movie. POST /api/movies
     * @param {Object} movie
     * @returns {Promise<{movie: Object}>}
     * @example
     * {
     * "title": "The Matrix",
     * "release_date": 1930,
     * "genre_ids": [1,2]
     */
    async createMovie(movie, authToken) {
        const response = await this.instance.post(
            `movies`,
            movie,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`
                },
            }
        );

        return response;
    }

    /**
     * @description Delete a movie. Delete /api/movies/:id
     * @param {number} id
     * @returns 204
     */
    async deleteMovie(id, authToken) {
        const response = await this.instance.delete(
            `movies/${id}`,
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

module.exports = MoviesApi;