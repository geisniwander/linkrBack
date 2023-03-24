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

export async function getUserByPieceUsernameRepository(username) {
    return db.query(
      `SELECT json_build_object(
          'id', users.id,
          'email', users.email,
          'username', users.username,
          'picture_url', users.picture_url
        )
        FROM users WHERE username LIKE $1::text`,
      [`${username}%`]
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

  // export async function getUser(token){
  //   return db.query(
  //     `SELECT user_id FROM sessions WHERE token =$1`,
  //     [token]
  //   );
  // }

  
  export async function followId(user_id, user_followed){
   
    return await db.query(
      
      `SELECT * FROM follows WHERE user_id = $1 AND user_followed = $2`,
      [user_id, user_followed]
    );
  }

  export async function mutualId(user_id){
    return await db.query(
      `SELECT array_agg(user_followed) AS "ids" FROM follows WHERE user_id = $1`,
      [user_id]
      )
  }