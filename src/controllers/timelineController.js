import { db } from "../database/database.js";
import urlMetadata from "url-metadata";

export async function getTimeline(req, res){
    try{
        const session = res.locals.session;
        const url = await db.query(`SELECT picture_url FROM users WHERE id=$1;`, [session.user_id])
        const posts = await db.query(`SELECT posts.id, posts.text, posts.url, users.picture_url, users.username FROM posts JOIN users ON users.id = posts.user_id ORDER BY posts.id DESC LIMIT 20;`)
        let i = 0
        const postsMetadata = posts.rows
        posts.rows.forEach(p => {
            urlMetadata(p.url).then(
                function (metadata) {
                    postsMetadata[i] = {...p, title: metadata.title, image:metadata.image, description: metadata.description}
                    i++
                    if(i === posts.rows.length){
                        postsMetadata.sort(function (a, b) {
                            if (a.id < b.id) {
                              return 1;
                            }
                            if (a.id > b.id) {
                              return -1;
                            }
                            return 0;
                          });
                        return res.send({avatar: url.rows[0].picture_url, posts: postsMetadata});
                    }
                    
                })
        })
        
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
                const hashtagId = await db.query(`SELECT id FROM hashtags WHERE name=$1;`, [element])
                const postId = await db.query(`SELECT id from posts WHERE user_id=$1 order by id desc limit 1;`, [session.user_id])
                await db.query(`
                        INSERT INTO posts_hashtags (post_id, hashtag_id)
                        VALUES ($1, $2);
                    `, [postId.rows[0].id, hashtagId.rows[0].id])
            });
        }

        return res.sendStatus(201);
    } catch (error){
        res.status(500).send(error.message)
    }
}
