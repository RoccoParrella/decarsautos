const { Schema, model } = require('mongoose');
const moment = require('moment')

class FormModel {
    constructor() {
        const schema = new Schema({
            name: String,
            email: String,
            motivo: String,
            mensaje: String,
            date: String
        })
        this.model = model('form', schema);
    }

    // Get all the MSG in the database

    async getAll() {
        return await this.model.find({}).lean();
    }

    // Save MSG in the database

    async save(obj) {
        obj.date = moment().format('L')
        return await this.model.create(obj);
    }

    // Delte MSG by ID

    async deleteById(id){
        return await this.model.findByIdAndDelete({id_ : id})
    }

}

module.exports = new FormModel();