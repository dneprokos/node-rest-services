const BaseApi = require('./_BaseApi');

class GenresApi extends BaseApi {
    constructor() {
        super();
    }

    /**
     * @description Get all genres. GET /api/genres
     * @returns {Promise<{genres: Array}>}
     */
    async getGenres(authToken) {
        const response = await this.instance.get(
            `genres`,
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
     * @description Get a genre by id. GET /api/genres/:id
     * @param {number} id
     * @returns {Promise<{genre: Object}>}
     */
    async getGenreById(id, authToken) {
        const response = await this.instance.get(
            `genres/${id}`,
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
     * @description Create a genre. POST /api/genres
     * @param {Object} genre
     * @returns {Promise<{genre: Object}>}
     * @example
     * {
     *  "name": "Action"
     * }
     * 
    */
    async createGenre(genre, authToken) {
        const response = await this.instance.post(
            `genres`,
            genre,
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
     * @description Create multiple genres. POST /api/genres
     * @param {Array} genres
     * @returns {Promise<Array>}
     * @example
     * [
     * {
     * "name": "Action"
     * },
     * {
     * "name": "Horror"
     * }
     * ]
     * 
    */
    async createGenres(genres, authToken) {
        const response = await this.instance.post(
            `genres/bulk`,
            genres,
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
     * @description Update a genre. PUT /api/genres/:id
     * @param {number} id
     * @param {Object} genre
     * @returns {Promise<{genre: Object}>}
     * @example
     * {
     *  "name": "Action"
     * }
     * 
    */
    async updateGenre(id, genre, authToken) {
        const response = await this.instance.put(
            `genres/${id}`,
            genre,
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
     * @description Delete a genre. DELETE /api/genres/:id
     * @param {number} id
     * @returns {Promise<{genre: Object}>}
     */
    async deleteGenre(id, authToken) {
        const response = await this.instance.delete(
            `genres/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`
                },
            }
        );

        return response;
    }

    //Search generes with query params: Name, Page, Limit. /api/genres/search?name=Action&page=1&limit=10
    /**
     * @description Search genres with query params: Name, Page, Limit. /api/genres/search?name=Action&page=1&limit=10
     * @param {Object} queryParams
     * @returns {Promise<{genres: Array}>}
     * @example
     * {
     * "name": "Action",
     * "page": 1,
     * "limit": 10
     * }
     */
    async searchGenres(queryParams = {}, authToken) {
        const response = await this.instance.get(
            `genres/search`,
            {
                params: queryParams,
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`
                },
            }
        );

        return response;
    }
}

module.exports = GenresApi;