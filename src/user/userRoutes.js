const { Router } = require('express');
const userRouter = Router();
const { createUser, listUsers, login } = require('./userControllers');
const { hashPass, comparePass} = require ("../middleware/index");


userRouter.get('/listUser', listUsers);
userRouter.post('/login',comparePass, login)
userRouter.post('/addUser', hashPass, createUser);

module.exports = userRouter;