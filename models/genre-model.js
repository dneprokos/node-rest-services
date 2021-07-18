const Joi = require('joi');

function validateProperties(id, name) {
    const schema = {
        id: Joi.number().required().min(1),
        name: Joi.string().required().min(3)
    };

    return Joi.validate({id, name}, schema);
}

module.exports = class Genre {
    constructor(id, name) {
        const { error } = validateProperties(id, name);
        if (error) throw new Error("Genre class validation failed with an error:" + error.details[0].message);

        this.id = id;
        this.name = name;
    }
}

