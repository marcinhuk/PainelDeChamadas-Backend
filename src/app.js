require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const json_server = require('json-server')
const io_client = require('socket.io-client')

const app = express()

app.use(cors({origin: `${process.env.FRONTEND_SERVER_URL}:${process.env.FRONTEND_SERVER_PORT}`}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, { cors: { origin: `${process.env.FRONTEND_SERVER_URL}:${process.env.FRONTEND_SERVER_PORT}` } } )

const jsonServer = json_server.create()
const router = json_server.router('src/data/orders.json')
const middlewares = json_server.defaults()

const ordersRoutes = require('./routes/orders')
const configsRoutes = require('./routes/configs')

const controllerConfigs = require('./controllers/configs')
const controllerOrders = require('./controllers/orders')

jsonServer.use(middlewares)
jsonServer.use(router)

app.use('/orders', ordersRoutes)
app.use('/configs', configsRoutes)

app.get('/test', (req, res) => {
	return res.json({msg: 'Test ok!'})
})

io.on('connection', async socket => {
	const amountClients = io.engine.clientsCount

	if (amountClients > 6){
		socket.emit('maxClients', true)

		return socket.disconnect()
	} else {
		socket.emit('maxClients', false)
	}

	console.log(`Client ${socket.id} connected.`)

	socket.on('disconnect', () => console.log(`Client ${socket.id} diconnected.`) )

	socket.on('inicialInformations', async data => {
		socket.emit('receivedSound', { verb: "GET", sound: await controllerConfigs.getSound() } )

		socket.emit('receivedLayout', { verb: "GET", layout: await controllerConfigs.getLayout() } )

		socket.emit('receivedOrders', { verb: "GET", orders: await controllerOrders.getOrders() } )
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