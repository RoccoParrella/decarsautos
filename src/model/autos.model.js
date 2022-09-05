const { Schema, model } = require('mongoose');
const moment = require('moment');
const e = require('express');

class AutosModel {
    constructor() {
        const schema = new Schema({
            brand: String,
            model: String,
            year: String,
            img: String,
            imgs: [],
            price: String,
            motor: String,
            transmision: String,
            KM: String,
            location: String,
            doors: String,
            gas: String,
            color: String,
            break: String,
            date: String
        })
        this.model = model('autos', schema);
    }

    // Get all the cars in the database

    async getAll() {
        return await this.model.find({}).lean();
    }

    // Save cars in the database

    async save(user) {
        user.date = moment().format('L')
        return await this.model.create(user);
    }

    // Return user by ID

    async getById(id) {
        return await this.model.findById(id);
    }

    // Delete car by ID

    async deleteCarById(id) {
        return await this.model.findOneAndDelete({ _id: id })
    }

    // Update IMG by ID

    async updateImg(id, arr) {
        return await this.model.findByIdAndUpdate(id, { imgs: arr })
        
    }
}

module.exports = new AutosModel();