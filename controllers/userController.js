import db from '../db.js'
export async function getUserById(req,res){
    const {id}=req.params
    const {userId}=res.locals
    if(id!=userId){return res.sendStatus(401)}
    try{
        const result=await db.query(`
            SELECT
                us.name,
                ur.id AS "urlId",
                ur."shortUrl",
                ur.url,
                ur."visitCount" 
            FROM users us
            JOIN urls ur ON ur."userId"=us.id
            WHERE us.id=$1
            ;
        `,[id]) 
        const resultSum=await db.query(`
            SELECT
                SUM(ur."visitCount") AS sum
            FROM users us
            JOIN urls ur ON ur."userId"=us.id
            WHERE us.id=$1
            GROUP BY us.id
            ;
        `,[id]) 
        if(result.rowCount==0 || resultSum.rowCount==0){return res.sendStatus(404)}
        const urlsList=[]
        for(let k=0;k<result.rowCount;k++){
            urlsList.push({
                id:result.rows[k].urlId,
                shortUrl:result.rows[k].shortUrl,
                url:result.rows[k].url,
                visitCount:result.rows[k].visitCount
            })
        }
        const responseBody={
            id,
            name:result.rows[0].name,
            visitCount:resultSum.rows[0].sum,
            shortenedUrls:urlsList
        }
        res.status(200).send(responseBody)
    }catch(e){res.sendStatus(500);console.log(e)}
}
export async function getRanking(req,res){
    try{
        const result=await db.query(`
        SELECT
        s.id AS id,
        s.name AS name,
        COUNT(*) AS "linksCount",
        SUM(r."visitCount") AS "visitCount"
        FROM urls r
        JOIN users s on s.id=r."userId"
        GROUP BY name, s.id
        ORDER BY SUM(r."visitCount") DESC
        LIMIT 10
        ;
            
        `)
        res.status(200).send(result.rows)
    }catch{res.sendStatus(500)}
}
