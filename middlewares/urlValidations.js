import db from "../db.js";
import joi from 'joi'
export async function validateToken(req,res,next){
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    try{
        const user=await db.query(`
        SELECT * 
        FROM sessions
        WHERE token=$1
        ;
        `,[token])
        if(user){
            res.locals.userId=user.rows[0].userId
            return next()
        }else{
            return res.sendStatus(401)
        }
    }catch{res.sendStatus(500)}
}
export async function validateUrl(req,res,next){
    const schema = joi.object({
        url: joi.string().required()
    })
    const {error} = schema.validate(req.body, { abortEarly: false });
    if (error) {
        console.log(error.details)
        return res.sendStatus(422)
    }else{
        return next()
    }
}
export async function checkOwner(req,res,next){
    const {id}=req.params
    const {userId}=res.locals
    try{
        const result =await db.query(`
            SELECT * FROM urls
            WHERE id=$1
            ;
        `,[id])
        if(result.rowCount!=1){return res.sendStatus(404)}
        if (result.rows[0].userId!=userId) {
            return res.sendStatus(401)
        }else{
            return next()
        }
    }catch{res.sendStatus(500)}
    
}



