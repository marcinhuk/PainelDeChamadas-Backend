const { body, param } = require('express-validator')

const postOrders = [
	body("id").isNumeric().withMessage("Order ID must be numeric").isLength({min: 1, max: 15}).withMessage("Order Id must have between 1 and 15 characters."),
	body("order").isNumeric().withMessage("Order number must be numeric").isLength({min: 1, max: 6}).withMessage("Order number must have between 1 and 6 characters.")
]

const deleteOrder = [
	param("id").isNumeric().withMessage("Order ID must be numeric").isLength({min: 1, max: 15}).withMessage("Order Id must have between 1 and 15 characters.")
]

module.exports = { postOrders, deleteOrder }