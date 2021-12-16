const express = require('express')
const router = express.Router()

const DenunciasController = require('../controllers/denunciasController')

router.get('/denuncias', DenunciasController.all)
router.post('/denuncias', DenunciasController.denuncia)


module.exports = router