const Genre = require('../models/genres-mongo-model');

async function getAllGenres() {
    const genres = await Genre.find().sort('id').select('-_id id name');
    return genres.map(genre => {
        return { id: genre.id, name: genre.name };
    });
}
  
async function getGenreById(id) {
  const genre = await Genre.findById(id).select('-_id id name');
  return genre ? { id: genre.id, name: genre.name } : null;
}
  
async function createGenre(name) {
    // Find the genre with the highest id
    const lastGenre = await Genre.find().sort({ id: -1 }).limit(1);
    const maxId = lastGenre.length === 0 ? 0 : lastGenre[0].id;

    // Create a new genre with an id that is one greater than the maxId
    const genre = new Genre({
        id: maxId + 1,
        name: name
    });

    // Save the new genre
    await genre.save();

    return { id: genre.id, name: genre.name };
}

async function createGenres(newGenres) {
    if (!Array.isArray(newGenres) || newGenres.length === 0) {
        return [];
    }

    // Find the current maximum id
    const lastGenre = await Genre.find().sort({ id: -1 }).limit(1);
    let maxId = lastGenre.length === 0 ? 0 : lastGenre[0].id;

    // Map newGenres to include new ids
    const genresToAdd = newGenres.map(genre => {
        maxId++; // Increment maxId for each new genre
        return new Genre({ id: maxId, name: genre.name });
    });

    // Insert all new genres
    await Genre.insertMany(genresToAdd);

    // Return the added genres with their new ids and names
    return genresToAdd.map(genre => ({ id: genre.id, name: genre.name }));
}
  
async function updateGenre(id, name) {
    const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true }).select('-_id id name');
    return genre ? { id: genre.id, name: genre.name } : null;
}

async function deleteGenre(id) {
    const genre = await Genre.findByIdAndRemove(id).select('-_id id name');
    return genre ? { id: genre.id, name: genre.name } : null;
}

async function searchGenresByName(name) {
    let query;

    // Return all genres if no name is provided or name is empty
    if (!name || name.trim() === "") {
        query = Genre.find();
    } else {
        // Perform a case-insensitive search
        const regex = new RegExp(name, 'i');
        query = Genre.find({ name: { $regex: regex } });
    }

    // Execute the query and transform the results to only include id and name
    const genres = await query.select('id name').sort('id');
    return genres.map(genre => {
        return { id: genre.id, name: genre.name };
    });
}

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  createGenres,
  updateGenre,
  deleteGenre,
  searchGenresByName
};