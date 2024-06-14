const { validationResult } = require('express-validator')

const getConfigs = async (req, res) => {
	const response = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/configs`, {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})

	return res.json(await response.json())
}

const getSound = async (req, res) => {
	const response = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/configs/sound`, {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})

	if (req)
		return res.json(await response.json())
	else
		return await response.json()
}

const getLayout = async (req, res) => {
	const response = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/configs/layout`, {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})

	if (req)
		return res.json(await response.json())
	else
		return await response.json()
}

const patchSound = async (req, res, next) => {
	if (validationResult(req).errors.length == 0){
		const response = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/configs/sound`, {
			headers: { "Content-Type": "application/json" },
			method: "PATCH",
			body: JSON.stringify({
				"value": req.body.value
			})
		})

		const responseJson = await response.json()

		socket_client.emit('sendSound', { verb: "PATCH", sound: await getSound() })

		return res.json(responseJson)
	} else {
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

const patchLayout = async (req, res, next) => {
	if (validationResult(req).errors.length == 0){
		const response = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/configs/layout`, {
			headers: { "Content-Type": "application/json" },
			method: "PATCH",
			body: JSON.stringify({
				"value": req.body.value
			})
		})

		const responseJson = await response.json()

		socket_client.emit('sendLayout', { verb: "PATCH", layout: await getLayout() })

		return res.json(responseJson)
	} else {
		error = {type: 'VALIDATION', messages: validationResult(req)}

		return res.status(400).json(error)
	}
}

module.exports = { getConfigs, getLayout, getSound, patchLayout, patchSound }