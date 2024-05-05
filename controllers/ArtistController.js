const { update } = require('firebase/database');
const Artist = require('../models/Artist');
const upload = require('../middleware/firebaseUploadMiddleware').upload;

const ArtistController = {

    // GET ALL ARTISTS
    async getAll(req, res) {
        try {
            const artist = await Artist.find();
            res.json(artist);
        } catch (error) {
            console.log(error);
        }
    },

    // GET ARTIST BY ID
    async getById(req, res) {
        try {
            const id = req.params._id;
            const artist = await Artist.findById(id);
            res.json(artist)
        } catch (error) {
            console.log(error);
        }
    },

    // CREATE ARTIST
    async createArtist(req, res) {
        try {
            let artistData = req.body;

            if (req.file) {
                artistData.image = req.file.downloadURL
            }
            const artist = await Artist.create(artistData);
            res.status(201).send(artist);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    // UPDATE ARTIST
    async updateArtist(req, res) {
        try {
            const id = req.params._id;
            const updateData = req.body;

            const existingArtist = await Artist.findById(id);
            if (!existingArtist) {
                return res.status(404).json({ message: "This artist does not exist." });
            }

            existingArtist.firstname = updateData.firstname || existingArtist.firstname;
            existingArtist.lastname = updateData.lastname || existingArtist.lastname;
            existingArtist.born = updateData.born || existingArtist.born;
            existingArtist.based = updateData.based || existingArtist.based;
            existingArtist.about = updateData.about || existingArtist.about;

            if (req.file && req.file.downloadURL) {
                existingArtist.image = req.file.downloadURL;
            }

            await existingArtist.save();

            res.status(200).json({ message: "Artist updated successfully.", updatedArtist: existingArtist });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // DELETE ARTIST
    async deleteArtist(req, res) {
        try {
            const id = req.params._id;
            const artist = await Artist.findByIdAndDelete(id);
            if (!artist) {
                return res.status(404).json({ message: "This artist does not exist." });
            }
            res.status(200).json({ message: "Artist deleted successfully.", artist });
        } catch (error) {
            console.error("Error deleting artist: ", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async search(searchTerm) {
        console.log('Searching for:', searchTerm);
        try {
        const artists = await Artist.find({
          $or: [
            { firstname: new RegExp(searchTerm, 'i') },
            { lastname: new RegExp(searchTerm, 'i') },
            { about: new RegExp(searchTerm, 'i') },
          ],
        });
        console.log('Found artists:', artists);
        return artists;
    } catch (error) {
        console.error('Error searching artists:', error);
        throw error;
    }
      },
};

module.exports = ArtistController, upload;