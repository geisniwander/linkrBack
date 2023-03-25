import { db } from "../database/database.js";

export async function getUserByIdRepository(id) {
    return db.query(
      `SELECT json_build_object(
          'id', users.id,
          'email', users.email,
          'username', users.username,
          'picture_url', users.picture_url
        )
        FROM users WHERE id = $1`,
      [id]
    );
  }

export async function getUserByPieceUsernameRepository(username, user_id) {
    return db.query(
      `SELECT json_build_object(
        'id', users.id,
        'email', users.email,
        'username', users.username,
        'picture_url', users.picture_url,
        'following', 
    CASE WHEN id = ANY(SELECT user_followed FROM follows WHERE user_id = $2)
      THEN true 
      ELSE false
    END
      )
     FROM users
     WHERE lower(username) LIKE $1::text
     ORDER BY 
       CASE WHEN id = ANY(SELECT user_followed FROM follows WHERE user_id = $2)
         THEN 0 
         ELSE 1 
       END,
       username 
     LIMIT 5`,
      [`${username}%`, user_id]
    );
  }

  export async function getUserByUsernameRepository(username) {
    return db.query(
      `SELECT json_build_object(
          'id', users.id,
          'email', users.email,
          'username', users.username,
          'picture_url', users.picture_url
        )
        FROM users WHERE username = $1`,
      [username]
    );
  }

  ///sprint 2
  export async function followUser(user_id, user_followed){
    return db.query(
      `INSERT INTO follows (user_id, user_followed)
      VALUES($1, $2)`,
      [user_id, user_followed]
    );
  }

  export async function unfollowUser(user_id, user_followed){
    return db.query(
      `DELETE FROM follows WHERE user_id=$1 AND user_followed=$2`,
      [user_id, user_followed]
    );
  }

 
  
  export async function followId(user_id, user_followed){
   
    return await db.query(
      
      `SELECT * FROM follows WHERE user_id = $1 AND user_followed = $2`,
      [user_id, user_followed]
    );
  }


 export async function checkFollow(user_id){
  return await db.query(
    `SELECT * FROM follows WHERE user_id = $1`,
    [user_id]
  )
 }