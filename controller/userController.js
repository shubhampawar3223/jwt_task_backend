const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const models = require('../models')
const saltDiff = 10

//function for user registration
const register = async (req, res) => {
    try {
        //validating i/p
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.phone) {
            throw new Error("Please provide correct inputs.")
        }

        if (req.body.password.length < 8) {
            throw new Error("Password length must be above or equal to 8 characters")
        }

        const user = await models.User.findOne({
            where: {
                email: req.body.email
            }
        })

        //validating if user is already present 
        if (user) {
            throw new Error("User is already present")
        }

        //encrypting the password
        let salt = await bcrypt.genSalt(saltDiff)
        req.body.password = await bcrypt.hash(req.body.password, salt)

        //creating new user
        await models.User.create(req.body)

        res.status(200).send("Success")
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const login = async (req, res) => {
    try {
        //validating i/p
        if (!req.body.email || !req.body.password) {
            throw new Error("Please provide correct inputs.")
        }

        if (req.body.password.length < 8) {
            throw new Error("Password length must be above or equal to 8 characters")
        }

        const user = await models.User.findOne({
            where: {
                email: req.body.email
            }
        })

        //validating if user is already present 
        if (!user) {
            throw new Error("User is not present.Register first.")
        }

        //validate Password
        let checkPassword = await bcrypt.compare(req.body.password, user.password)

        if (!checkPassword) {
            throw new Error("Incorrect password.")
        }

        let accessToken = jwt.sign({ email: user.email }, process.env.JWT_KEY,{expiresIn:"2m"})
        let refreshToken = jwt.sign({ phone: user.phone }, process.env.REFRESH_TOKEN_KEY,{expiresIn:"1d"})

        res.status(200).send({ accessToken, refreshToken})
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error.message) 
    }
}

//function lists all users
const listUsers = async (req, res) => {
    try {
        let list = await models.User.findAll({ attributes: ['name', 'email','phone'] })
        res.status(200).send(list)
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

//function updates userData
const updateUser = async (req, res) => {
    try {
        //i/p validation
        if (!req.body.email && !req.body.newPassword && !req.body.name && !req.body.phone) {
            throw new Error('Please enter valid inputs.')
        }

        let updatedData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        }

        //checking newPassword and encrypting it 
        if (req.body.newPassword) {
            let salt = await bcrypt.genSalt(saltDiff)
            updatedData['password'] = await bcrypt.hash(req.body.newPassword, salt)
        }

        let userUpdate = await models.User.update(updatedData, {
            where: {
                email: req.user.email
            }
        })

        if (userUpdate[0]) {
            res.status(200).send("User updated successfully.")
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

module.exports = {
    register,
    login,
    listUsers,
    updateUser
}