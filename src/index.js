const express = require('express')
const app = express()


const apiRoutes = require('./routes/index')
const { PORT } = require('./config/ServerConfig')
const bodyParser = require('body-parser')

const prepareAndStartServer = () => {

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes)

    app.listen(PORT,() => {
        console.log('Server is up and running on port',PORT)
    }) 
}

prepareAndStartServer();