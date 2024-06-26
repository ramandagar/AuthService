const express = require('express')
const app = express()
const apiRoutes = require('./routes/index')
const { PORT } = require('./config/ServerConfig')
const bodyParser = require('body-parser')
const db  = require('./models/index')

const {User,Role} = require('./models/index')

const UserService = require('./services/user-service')
const prepareAndStartServer = () => {
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes)
    app.listen(PORT,async() => {
        console.log('Server is up and running on port',PORT)
       const service = new UserService();
    //    const newToken = service.createToken({
    //      id: 1,
    //      email: 'raman2@gmail.com'
    //      })
    //    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InJhbWFuMkBnbWFpbC5jb20ifSwiaWF0IjoxNzEyMjI0NjAzLCJleHAiOjE3MTIyMjgyMDN9.JEx1eLMCzQBx3SY6UsKcSU3Q7kslig4rSUJruC5AkQg'
    //    const response = service.verifyToken(token)
    //    console.log(response)
    
    if(process.env.DB_SYNC){
        db.sequelize.sync({alter: true})
    }

    const u1  = await User.findByPk(1)
    const r1 = await Role.findByPk(2)
    u1.addRole(r1);

    }) 
}

prepareAndStartServer();