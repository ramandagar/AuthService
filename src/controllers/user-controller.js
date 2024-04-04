const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.body.email)
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password,
        });
        console.log('response',response)
        return res.status(201).json({
            success:true,
            message: 'Successfully created a user',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            data:{},
            success: false,
            err: error,
        })
    }
}

const destroy = async (req, res) => {
    try {
        const response = await userService.destroy(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted a user',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            data:{},
            success: false,
            err: error,
        })
    }
}



const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            message: 'Successfully signed in',
            data: response,
            err: {}
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            data:{},
            success: false,
            err: error,
        }) 
    }
}



module.exports = {
     create,
     destroy,
     signIn
    };