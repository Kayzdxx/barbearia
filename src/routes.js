const express = require('express')

const router = express.Router()
const BarberController = require('./app/controllers/BarberController')
const BarbershopController = require('./app/controllers/BarbershopController')
const ClientController = require('./app/controllers/ClientController')
const CutController = require('./app/controllers/CutController')


const authMiddleware = require('./app/middlewares/auth')


//  router.get('/', function (req, res) {
//      res.status(200).send('Server on')
//  })

router.post('/cadastro', BarberController.store)
router.post('/login', BarberController.login)

router.use(authMiddleware)

router.get('/barbers', BarberController.index)
router.put('/barbers/:id', BarberController.update)
router.get('/barber', BarberController.show)

router.post('/barbers/barbershop', BarbershopController.store)
router.get('/barbers/barbershop', BarbershopController.index)
router.put('/barbers/barbershop/:id', BarbershopController.update)
router.delete('/barbers/barbershop/:id', BarbershopController.delete)


router.post('/barbershops/:barbershop_id/clients', ClientController.store)
router.get('/barbershops/:barbershop_id/clients', ClientController.index)
router.get('/clients/:client_id', ClientController.show)
router.post('/barbershops/:barbershop_id/clients/:client_id/cuts', CutController.store)
// router.put('/barbershops/:barbershop_id/clients', ClientController.update)
// router.delete('/barbershops/:barbershop_id/clients', ClientController.delete)

module.exports = router