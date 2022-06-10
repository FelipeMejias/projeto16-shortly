import Router from 'express'
import {getUserById,getRanking} from '../controllers/userController.js'
import { validateToken } from '../middlewares/urlValidations.js'
export const userRouter=Router()

userRouter.get('/users/:id',validateToken , getUserById )
userRouter.get('/ranking', getRanking )

