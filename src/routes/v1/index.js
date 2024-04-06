const express = require('express');
const UserController = require('../../controllers/user-controller');
const { AuthRequestValidatorMiddleware } = require('../../middlewares/index') 
const router = express.Router();


router.post('/signup',AuthRequestValidatorMiddleware.validateUserAuth, UserController.create);
router.post('/signin', UserController.signIn);

router.get('/isAuthenticated',(req,res)=>{
    res.status(200).json({message: 'OK'})
})
module.exports = router;

