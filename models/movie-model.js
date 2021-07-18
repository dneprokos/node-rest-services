module.exports = class Movie {
    constructor(id, name, release_date, genre_ids) {
        this.id = id;
        this.name = name;
        this.release_date = release_date,
        this.genre_ids = genre_ids
    }
}