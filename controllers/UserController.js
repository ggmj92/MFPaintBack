const User = require('../models/User');
const bcrypt = require('bcrypt');

const UserController = {

    // GET ALL USERS
    async getAll(req, res) {
        try {
            const users = await User.find();
            res.json(users);
            console.log(users);
        } catch (error) {
            console.log(error);
        }
    },

    // GET USER BY ID
    async getById(req, res) {
        try {
            const id = req.params._id;
            const user = await User.findById(id);
            res.json({ ...user.toObject(), isAdmin: user.isAdmin });
        } catch (error) {
            console.log(error);
        }
    },

    // CREATE USER
    async createUser(req, res) {
        try {
            const { firstname, lastname, username, email, isAdmin } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already in use' });
            }

            const user = new User({
                email,
                firstname,
                lastname,
                username,
                isAdmin
            });
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    // UPDATE USER
    async updateUser(req, res) {
        try {
            const id = req.params._id;
            const updateData = req.body;

            const existingUser = await User.findById(id);
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            existingUser.firstname = updateData.firstname || existingUser.firstname;
            existingUser.lastname = updateData.lastname || existingUser.lastname;
            existingUser.username = updateData.username || existingUser.username;
            existingUser.isAdmin = updateData.isAdmin || existingUser.isAdmin;

            await existingUser.save();

            res.status(200).json({ message: 'User updated successfully', updatedUser: existingUser });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // DELETE USER
    async deleteUser(req, res) {
        try {
            const id = req.params._id;
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully', user });
        } catch (error) {
            console.error('Error deleting user: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // SEARCH
    async search(searchTerm) {
        console.log('Searching for:', searchTerm);
        try {
            const users = await User.find({
                $or: [
                    { firstname: new RegExp(searchTerm, 'i') },
                    { lastname: new RegExp(searchTerm, 'i') },
                    { username: new RegExp(searchTerm, 'i') },
                ],
            });
            console.log('Found users:', users);
            return users;
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    },
};

module.exports = UserController;