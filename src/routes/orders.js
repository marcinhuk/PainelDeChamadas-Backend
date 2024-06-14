const router = require('express').Router()

const validatorOrders = require('../validators/orders')
const controllerOrders = require('../controllers/orders')

router.get('/', controllerOrders.getOrders)

router.post('/', validatorOrders.postOrders, controllerOrders.postOrders)

router.delete('/:id', validatorOrders.deleteOrder, controllerOrders.deleteOrders)

module.exports = router