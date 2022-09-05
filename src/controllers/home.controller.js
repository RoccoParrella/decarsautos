const autosModel = require('../model/autos.model')
const formModel = require('..//model/form.model')
const moment = require('moment')

module.exports = {
    getHome: async (req,res) => {
        const arrayAutos = await autosModel.getAll()
        res.render('index', { data: arrayAutos })
    },
    getAutos: async (req,res) => {
        const arrayAutos = await autosModel.getAll()
        res.render('autos', { data: arrayAutos })
    },
    getAutosById: async (req,res) =>{
        const { id } = req.params
        const auto = await autosModel.getById(id)
        auto.date = moment(`${auto.date}`, "MM/DD/YYYY").fromNow();
        res.render('autoById', {data: auto} )
    },
    getContacto: async (req,res) => {
        res.render('contacto')
    },
    postContacto: async (req,res) =>{
        let form = req.body
        formModel.save(form)
        res.redirect('/')
    },
    getCargar: async (req,res) => {
        res.render('createCar')
    },
    postCargar: async(req,res) => {
        let auto = req.body
        autosModel.save(auto)
        res.redirect('/')
    },
    getAdmin: async (req,res) => {
        res.render('admin')
    },
    getVehiculosAdmin: async(req,res) => {
        const arrayAutos = await autosModel.getAll()
        res.render('adminVehiculos', {data: arrayAutos})
    },
    getDeleteCarById: async(req,res) => {
        const { id } = req.params
        await autosModel.deleteCarById(id)
        res.redirect('/admin')
    },
    getAdminModifyCar: async(req,res) => {
        const { number, id} = req.query
        let array = [] 
        for (let i = 0; i < number; i++) {
            array.push(id)
        }
        res.render("modifyCar", {data: array},)
    },
    postAdminAddImgCar: async (req,res) =>{
        const {img, id} = req.body
        await autosModel.updateImg(id[0],img)
        res.redirect("/admin")
    }
}