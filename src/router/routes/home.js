const { Router } = require('express');
const router = new Router();
const auth = require('../../middlewares/auth.js')

const { getHome, getCargar, getAutos, postCargar, getContacto, postContacto, getAutosById, getAdmin, getVehiculosAdmin, getAdminModifyCar } = require('../../controllers/home.controller')

router.get('/', getHome)

router.get('/vehiculos', getAutos)

router.get('/vehiculo/:id', getAutosById)

router.get('/contacto', getContacto)

router.post('/contacto', postContacto)

router.get('/admin', auth, getAdmin)

router.get('/admin/vehiculos', auth, getVehiculosAdmin)

router.get('/admin/modifyCar', auth, getAdminModifyCar)

router.get('/admin/cargar', auth, getCargar)

router.post('/admin/cargar', auth, postCargar)

module.exports = router;