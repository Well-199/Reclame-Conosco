require('dotenv').config()
const express = require('express')
const cors = require('cors')

const routes = require('./routes/api.route')

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }));

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    server.use(cors())
    next()
})

server.use(express.static(__dirname+'/public'))

server.use('/v1', routes)

server.use((req, res) => {
    res.status(404)
    res.json({cod: 404, message: 'url não encontrada'})
})

module.exports = server