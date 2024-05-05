const { update } = require('firebase/database');
const Artwork = require('../models/Artwork');
const upload = require('../middleware/firebaseUploadMiddleware').upload;

const ArtworkController = {

    // GET ALL ARTWORKS
    async getAll(req, res) {
        try {
            const artwork = await Artwork.find();
            res.json(artwork);
        } catch (error) {
            console.log(error);
        }
    },

    // GET ARTWORK BY ID
    async getById(req, res) {
        try {
            const id = req.params._id;
            const artwork = await Artwork.findById(id);
            res.json(artwork);
        } catch (error) {
            console.log(error);
        }
    },

    // CREATE ARTWORK
    async createArtwork(req, res) {
        try {
            let artworkData = req.body;

            if (req.file) {
                artworkData.image = req.file.downloadURL;
            }

            const artwork = await Artwork.create(artworkData);
            res.status(201).send(artwork);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

// UPDATE ARTWORK
    async updateArtwork(req, res) {
        try {
            const id = req.params._id;
            const updateData = req.body;

            const existingArtwork = await Artwork.findById(id);
            if (!existingArtwork) {
                return res.status(404).json({ message: "This artwork does not exist." });
            }
            existingArtwork.artist = updateData.artist || existingArtwork.artist;
            existingArtwork.title = updateData.title || existingArtwork.title;
            existingArtwork.year = updateData.year || existingArtwork.year;
            existingArtwork.type = updateData.type || existingArtwork.type;
            existingArtwork.media = updateData.media || existingArtwork.media;
            existingArtwork.dimensions = updateData.dimensions || existingArtwork.dimensions;
            existingArtwork.location = updateData.location || existingArtwork.location;
            existingArtwork.description = updateData.description || existingArtwork.description;
            existingArtwork.price = updateData.price || existingArtwork.price;
            existingArtwork.sold = updateData.sold || existingArtwork.sold;

            await existingArtwork.save();

            if (req.file && req.file.downloadURL) {
                existingArtwork.image = req.file.downloadURL;
                await existingArtwork.save();
            }

            res.status(200).json({ message: "Artwork updated successfully.", updatedArtwork: existingArtwork });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // DELETE ARTWORK
    async deleteArtwork(req, res) {
        try {
            const id = req.params._id;
            const artwork = await Artwork.findByIdAndDelete(id);
            if (!artwork) {
                return res.status(404).json({ message: "This artwork does not exist." });
            }
            res.status(200).json({ message: "Artwork deleted.", artwork });
        } catch (error) {
            console.error('Error deleting artwork:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async search(searchTerm) {
        try {
            const artworks = await Artwork.find({
                $or: [
                    { title: new RegExp(searchTerm, 'i') },
                    { artist: new RegExp(searchTerm, 'i') },
                    { type: new RegExp(searchTerm, 'i') },
                    { media: new RegExp(searchTerm, 'i') },
                    { dimensions: new RegExp(searchTerm, 'i') },
                    { description: new RegExp(searchTerm, 'i') },
                ],
            });
            return artworks;
        } catch (error) {
            console.error('Error searching artworks:', error);
            throw error; 
        }
    },
};

module.exports = ArtworkController, upload;