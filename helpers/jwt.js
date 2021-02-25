// npm i jsonwebtoken

const jwt = require('jsonwebtoken');
// require('dotenv').config();

const generarJWT = ( uid ) => {
    // Generalmente lleva el uid pero podríamos colocar el role o nombre...
    return new Promise( ( resolve ,reject ) => {
        const payload = {
            uid
        };
    
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {expiresIn: '12h' },
            (err, token ) => {
                if(err){
                    console.log(err);
                    reject(err);
                }
                resolve( token );
            }); 
    });

};

module.exports = {
    generarJWT
};