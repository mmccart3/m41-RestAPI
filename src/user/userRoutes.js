const { Router } = require('express');
const userRouter = Router();
const { createUser, listUsers, login, updateUser, deleteUser } = require('./userControllers');
const { hashPass, comparePass, tokenCheck} = require ("../middleware/index");


userRouter.get('/listUser', listUsers);
userRouter.post('/login',comparePass, login);
userRouter.post('/addUser', hashPass, createUser);
userRouter.put('/updateUser', updateUser);
userRouter.delete('/deleteUser', deleteUser);
userRouter.get('/login',tokenCheck, login);

module.exports = userRouter;