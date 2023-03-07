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