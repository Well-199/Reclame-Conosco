const server = require('./server')

server.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.BASE}`)
})