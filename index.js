import express,{json} from "express"
import cors from 'cors'
import {authRouter} from './routers/authRouter.js'
import {urlRouter} from './routers/urlRouter.js'
import {userRouter} from './routers/userRouter.js'

const app=express()
app.use(cors())
app.use(json())

app.use(authRouter)
app.use(urlRouter)
app.use(userRouter)

app.listen(5003)