import db from '../db.js'
import bcrypt from 'bcrypt'
import {v4} from 'uuid'
export async function signUp(req,res){
    const {name,email,password}=req.body
    const passwordHash = bcrypt.hashSync(password, 10)
    
    try{
        await db.query(`
            INSERT INTO users (name,email,"passwordHash")
            VALUES ($1,$2,$3)
            ;
        `,[name,email,passwordHash])
        res.sendStatus(201)
    }catch(e){res.sendStatus(500);console.log(e)}
    
}
export async function signIn(req,res){
    const {email,password}=req.body
    try{
        const result=await db.query(`
            SELECT * 
            FROM users
            WHERE email=$1
            ;
            `,[email])
        if(result.rowCount==0){return res.sendStatus(401)}
        if( bcrypt.compareSync(password, result.rows[0].passwordHash)){
            const token=v4()
            await db.query(`
                INSERT INTO sessions ("userId",token)
                VALUES ($1,$2)
            ;
            `,[result.rows[0].id,token])
            res.status(200).send(token)
        }else{res.sendStatus(401)}
    }catch{res.sendStatus(500)}
    
}