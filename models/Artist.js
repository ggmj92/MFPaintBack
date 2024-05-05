const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        born: String,
        based: String,
        about: String,
        image: String,
    }, { timestamps: true }
);

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;