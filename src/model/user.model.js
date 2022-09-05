const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

class UserModel {
    constructor() {
        const schema = new Schema({
            username: String,
            password: String
        })
        this.model = model('users', schema);
    }

    // Get all the users in the database

    async getAll() {
        const user = await this.model.find({}).lean();
        return user
    }

    // Save user in the database

    async save(user) {
        user.password = await bcrypt.hash(user.password, 10);
        const usuario = await this.model.create(user);
        return usuario
    }

    // Return user by ID

    async getById(id) {
        return await this.model.findById(id);
    }

    // Return user by email

    async getByEmail(email) {
        return await this.model.findOne({ email });
    }

    // Return user by username

    async getByUsername(username) {
        return await this.model.findOne({ username })
    }

    //  Return a boolean indicating if the email exists in the database

    async existsByEmail(email) {
        return await this.model.exists({ email });
    }

    // Return a boolean indicating if the username exists in de the database

    async existsByUsername(username){
        return await this.model.exists({ username })
    }

    // Return a boolean indicating if password is valid

    async isPasswordValid(username, password) {
        let user
        if(username.length <= 8) {
            user = await this.model.findOne({ username })
        } else{
            user = await this.model.findOne({ email: username })
        }
        return await bcrypt.compare(password, user.password);
    }

}

module.exports = new UserModel();