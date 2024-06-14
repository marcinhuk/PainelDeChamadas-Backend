const { body } = require('express-validator')

const patchSound = [
	body("value").isBoolean().withMessage("Sound must be boolean.")
]

const patchLayout = [
	body("value").isString().withMessage("Layout must be string.").isLength({min: 3, max: 3}).withMessage("Layout must be like 0x0."),
]

module.exports = { patchSound, patchLayout }