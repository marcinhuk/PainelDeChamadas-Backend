const { validationResult } = require('express-validator')

const getOrders = async (req, res) => {
	const response = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/orders/?_sort=id&_order=desc`, {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})

	if (req)
		return res.json(await response.json())
	else
		return await response.json()
}

const postOrders = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		const response = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/orders`, {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify({
				"id": req.body.id,
				"order": req.body.order
			})
		})

		socket_client.emit('sendOrders', { verb: "POST", orders: await getOrders() })

		const responseJson = await response.json()

		return res.json(responseJson)
	}else{
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

const deleteOrders = async (req, res) => {
	if (validationResult(req).errors.length == 0){
		const response = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/orders/${req.params.id}`, {
			headers: { "Content-Type": "application/json" },
			method: "DELETE",
		})

		socket_client.emit('sendOrders', { verb: "DELETE", orders: await getOrders() })

		const responseJson = await response.json()

		return res.json(responseJson)
	} else {
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

module.exports = { getOrders, postOrders, deleteOrders }