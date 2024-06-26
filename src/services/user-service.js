const UserRepository = require('../repository/user-repository')
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/ServerConfig');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }


    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw { error }
        }
    }

    async destroy(userId) {
        try {
            const response = await this.userRepository.destroy(userId);
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw { error }
        }
    }
    async getById(userId) {
        try {
            const user = await this.userRepository.getById(userId);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw { error }
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign({ user }, JWT_KEY, { expiresIn: '1h' });
            return result
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw { error }
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation");
            throw { error }
        }
    }

 async signIn(email, plainPassword) {
     try {
         const user = await this.userRepository.getByEmail(email);
         const passwordMatch = this.checkPassword(plainPassword, user.password);
         if (!passwordMatch) {
             console.log("Password doesn't match");
             throw { error: "Incorrect Password" }
         }
         //create a token and return it
         const newJWT = this.createToken(user);
         return newJWT;
     } catch (error) {
         console.log("Something went wrong in service layer");
         throw { error }
     } 
 } 


async isAuthenticated(token) {
    try {
        const response = this.verifyToken(token);
        if(!response){
            throw {error: "Invalid token"}
        }
        const user = await this.userRepository.getById(response?.id);
        if(!user){
            throw {error: "No user found with this token"}
        }
        return user.id;
    } catch (error) {
        console.log("Something went wrong in service layer");
        throw { error }
    }
}


    checkPassword(userInputPlainPassword, encryptPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptPassword);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw { error }
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = await this.userRepository.getByEmail(userEmail);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw { error }
        }
    }
}

module.exports = UserService;