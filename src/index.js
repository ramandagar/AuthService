const express = require('express')
const app = express()


const apiRoutes = require('./routes/index')
const { PORT } = require('./config/ServerConfig')
const bodyParser = require('body-parser')

const UserRepository = require('./repository/user-repository')

const prepareAndStartServer = () => {
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes)

    app.listen(PORT,async() => {
        console.log('Server is up and running on port',PORT)
        const repo = new UserRepository();
        const response = await repo.getById(1);
        console.log('response',response);
    }) 
}

prepareAndStartServer();