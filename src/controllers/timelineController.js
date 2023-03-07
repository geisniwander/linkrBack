import { db } from "../database/database.js";

export async function getInfos(req, res){

    try{
        const session = res.locals.session;
        const url = await db.query(`SELECT picture_url FROM users WHERE id=$1;`, [session.user_id])

        return res.send(url.rows[0]);
    } catch (error){
        res.status(500).send(error.message)
    }
}

export async function postPublish(req, res){
    const {link, description} = req.body;

    try{
        const session = res.locals.session;

        await db.query(`
            INSERT INTO posts (url, text, user_id)
            VALUES ($1, $2, $3);
        `, [link, description, session.user_id])

        if(description.includes("#")){
            const array = description.split(" ")
            const hashtags = array.filter(i => i.includes("#"))
            
            hashtags.forEach(async element => {
                const hashtag = await db.query(`SELECT * FROM hashtags WHERE name=$1;`, [element])
                if(hashtag.rowCount === 0){
                    await db.query(`
                        INSERT INTO hashtags (name)
                        VALUES ($1);
                    `, [element])
                }
            });
        }

        return res.sendStatus(201);
    } catch (error){
        res.status(500).send(error.message)
    }
}