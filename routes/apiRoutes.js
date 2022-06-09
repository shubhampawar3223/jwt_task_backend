const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')
const verifyToken = require('../middleware/auth')

router.get('/',(req,res)=>{
    res.send("Success")
})

router.post('/user/signUp',userController.register)
router.post('/user/login',userController.login)
router.get('/user/list',verifyToken,userController.listUsers)
router.put('/user',verifyToken,userController.updateUser)

module.exports = router
