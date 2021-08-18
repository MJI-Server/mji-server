const jwt = require('jsonwebtoken');

const generarJWT = (uid, email) =>{

    return new Promise((resolve,reject)=>{
        const payload = {uid,email};
        jwt.sign(payload, process.env.CLAVE_SECRETA,{
            expiresIn:'2h'
        },(err,token)=>{
            if(err){
                reject('Error al generar token');
            }else{
                resolve(token);
            }
        });
    });

}

module.exports = {
    generarJWT
}