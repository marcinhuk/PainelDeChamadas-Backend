const router = require('express').Router()

const validotorConfigs = require('../validators/configs')
const controllerConfigs = require('../controllers/configs')

router.get('/', controllerConfigs.getConfigs)
router.get('/sound', controllerConfigs.getSound)
router.get('/layout', controllerConfigs.getLayout)

router.patch('/sound', validotorConfigs.patchSound, controllerConfigs.patchSound)
router.patch('/layout', validotorConfigs.patchLayout, controllerConfigs.patchLayout)

module.exports = router