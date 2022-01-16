const express = require('express')

const userRoute= express.Router();

const {userRegister , LoginUser , fetchUsers , deleteUser , UserDetails} = require('../controller/UserCont')


//Register routes

userRoute.post('/register' , userRegister)

//Login routes

userRoute.post('/login' , LoginUser)

//Fetch-Users

userRoute.get('/' , fetchUsers)

//Delete User with id

userRoute.delete('/:id' , deleteUser)

// Fetch User UserDetails

userRoute.get('/:id' , UserDetails)


module.exports = userRoute;