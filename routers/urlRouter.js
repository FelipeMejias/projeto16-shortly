import Router from 'express'
import {createUrl,getUrlById,openUrl,deleteUrl} from '../controllers/urlController.js'
import { validateToken , validateUrl,checkOwner} from '../middlewares/urlValidations.js'
export const urlRouter=Router()

urlRouter.post('/urls/shorten', validateUrl , validateToken , createUrl )
urlRouter.get('/urls/:id', getUrlById )
urlRouter.get('/urls/open/:shortUrl', openUrl )
urlRouter.delete('/urls/:id' , validateToken , checkOwner , deleteUrl )

