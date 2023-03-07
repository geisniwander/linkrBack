import {db} from "../database/database.js";

export async function authValidation(req, res, next) {
    const { authorization }  = req.headers;
    const token = authorization?.replace("Bearer ", '');
   
 
    if (!token) return res.sendStatus(401);

    try {
        const resultado = await db.query('SELECT * FROM sessions WHERE token = $1', [token]);
        
        if (resultado.rows.length === 0) return res.sendStatus(401);

        const sessao = resultado.rows[0];

        res.locals.session = sessao
        
        next();
    } catch(error){
        res.status(500).send(error);
    }
}


