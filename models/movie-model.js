const Joi = require('joi');

function validateProperties(id, name, release_date, genre_ids) {
    const schema = {
        id: Joi.number().required().min(1),
        name: Joi.string().required().min(3),
        release_date: Joi.number().min(1930),
        genre_ids: Joi.array().items(Joi.number())
    };

    return Joi.validate({id, name, release_date, genre_ids}, schema);
}

module.exports = class Movie {
    constructor(id, name, release_date, genre_ids) {
        const { error } = validateProperties(id, name, release_date, genre_ids);
        if (error) throw new Error("Movie class validation failed with an error:" + error.details[0].message);

        this.id = id;
        this.name = name;
        this.release_date = release_date,
        this.genre_ids = genre_ids
    }
}