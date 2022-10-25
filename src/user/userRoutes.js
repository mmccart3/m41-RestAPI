const { Router } = require('express');
const userRouter = Router();
const { createUser, listUsers } = require('./userControllers');
const { hashPass} = require ("../middleware/index")

userRouter.get('/listUser', listUsers);
userRouter.post('/addUser', hashPass, createUser);

module.exports = userRouter;