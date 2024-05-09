require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const json_server = require('json-server')
const io_client = require('socket.io-client')

const app = express()

app.use(cors({origin: '*'}))  ////origin: 'http://192.168.168.2:4200'
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, { cors: { origin: '*' } } ) //origin: 'http://192.168.168.50'

const jsonServer = json_server.create()
const router = json_server.router('src/data/orders.json')
const middlewares = json_server.defaults()

jsonServer.use(middlewares)
jsonServer.use(router)

//###################################################################

const getOrders = async () => {
	const responseOrders = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/orders/?_sort=id&_order=desc`, {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})

	return await responseOrders.json()
}

const getLayout = async () => {
	const responseLayout = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/configs/layout`, {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})

	return await responseLayout.json()
}

const getSound = async () => {
	const responseSound = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/configs/sound`, {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})

	return await responseSound.json()
}

//###################################################################

app.get('/orders', async (req, res) => {
	return res.json(await getOrders())
})

app.get('/configs', async (req, res) => {
	const responseSound = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/configs`, {
		headers: { "Content-Type": "application/json" },
		method: "GET"
	})

	return res.json(await responseSound.json())
})

app.post('/orders', async (req, res) => {
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
})

app.delete('/orders/:id', async (req, res, next) => {
	const response = await fetch(`${process.env.JSON_SERVER_URL}:${process.env.JSON_SERVER_PORT}/orders/${req.params.id}`, {
		headers: { "Content-Type": "application/json" },
		method: "DELETE",
	})

	socket_client.emit('sendOrders', { verb: "DELETE", orders: await getOrders() })

	const responseJson = await response.json()

	return res.json(responseJson)
})

app.get('/configs/sound', async (req, res, next) => {
	return res.json(await getSound())
})

app.get('/configs/layout', async (req, res, next) => {
	return res.json(await getLayout())
})

app.patch('/configs/sound', async (req, res, next) => {
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
})

app.patch('/configs/layout', async (req, res, next) => {
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
})

app.get('/test', (req, res) => {
	return res.json({msg: 'Test ok!'})
})

io.on('connection', async socket => {
    console.log(`Client ${socket.id} connected.`)

	socket.on('disconnect', () => console.log(`Client ${socket.id} diconnected.`) )

	socket.on('inicialInformations', async data => {
		socket.emit('receivedSound', { verb: "GET", sound: await getSound() } )

		socket.emit('receivedLayout', { verb: "GET", layout: await getLayout() } )

		socket.emit('receivedOrders', { verb: "GET", orders: await getOrders() } )
	})

	socket.on('sendSound', data => socket.broadcast.emit('receivedSound', data) )

	socket.on('sendLayout', data => socket.broadcast.emit('receivedLayout', data) )

	socket.on('sendOrders', data => socket.broadcast.emit('receivedOrders', data) )
})

jsonServer.listen(process.env.JSON_SERVER_PORT, () => {
	console.log(`JSON server running on port ${process.env.JSON_SERVER_PORT}.`)
})

httpServer.listen(process.env.HTTP_SERVER_PORT, () => {
	console.log(`HTTP server running on port ${process.env.HTTP_SERVER_PORT}.`)
	socket_client = io_client(`${process.env.HTTP_SERVER_URL}:${process.env.HTTP_SERVER_PORT}`)
})