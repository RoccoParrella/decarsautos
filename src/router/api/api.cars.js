const { Router } = require('express');
const router = new Router();
const auth = require('../../middlewares/auth.js')

const { getDeleteCarById, postAdminAddImgCar } = require('../../controllers/home.controller')

router.get('/admin/deleteCar/:id', auth, getDeleteCarById)

router.post('/admin/addImgCar', auth, postAdminAddImgCar)

module.exports = router;