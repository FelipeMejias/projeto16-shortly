import db from '../db.js'
import {nanoid} from 'nanoid'
export async function createUrl(req,res){
    const {userId}=res.locals
    const {url}=req.body
    const shortUrl=nanoid()
    try{
        await db.query(`
        INSERT INTO urls ("userId","shortUrl",url)
        VALUES ($1,$2,$3)
        ;
        `,[userId,shortUrl,url])
        res.status(201).send({shortUrl})
    }catch(e){res.sendStatus(500);console.log(e)}
}
export async function getUrlById(req,res){
    const {id}=req.params
    try{
        const result=await db.query(`
            SELECT id , "shortUrl" , url
            FROM urls
            WHERE id=$1
        ;
        `,[id])
        if(result.rowCount==0){return res.sendStatus(404)}
        res.status(200).send(result.rows[0])
    }catch{res.sendStatus(500)}
}
export async function openUrl(req,res){
    const {shortUrl}=req.params
    try{
        const result=await db.query(`
            SELECT * 
            FROM urls
            WHERE "shortUrl"=$1
        ;
        `,[shortUrl])
        
        if(!result.rows[0]){return res.sendStatus(404)}
        await db.query(`
            UPDATE urls
            SET "visitCount"=$1
            WHERE "shortUrl"=$2
        ;
        `,[result.rows[0].visitCount+1,shortUrl])
        res.redirect(result.rows[0].url)
    }catch{res.sendStatus(500)}
}
export async function deleteUrl(req,res){
    const {id}=req.params
    try{
        await db.query(`
            DELETE FROM urls WHERE id=$1
            ;
        `,[id])
        res.sendStatus(204)
    }catch{res.sendStatus(500)}
}