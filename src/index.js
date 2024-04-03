const express = require('express')
const app = express()

const { PORT } = require('./config/ServerConfig')

const prepareAndStartServer = () => {
    app.listen(PORT, () => {
        console.log('Server is up and running on port 3000')
    })
}

prepareAndStartServer();