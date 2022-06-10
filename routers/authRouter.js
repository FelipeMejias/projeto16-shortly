import Router from 'express'
import {signUp,signIn} from '../controllers/authController.js'
import { validateSignUp, validateSignIn } from '../middlewares/authValidations.js'

export const authRouter=Router()

authRouter.post('/signup',  signUp )
authRouter.post('/signin', validateSignIn , signIn )

