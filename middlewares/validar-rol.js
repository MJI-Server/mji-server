
const validarRoles = (...roles)=>{
    return (req, res, next)=>{
        if(!req.usuario){
            return  res.json({
                ok:false,
                msg:'El usuario no tiene el rol necesario para hacer esta accion'
            }) 
        }
        if(!roles.includes(req.usuario.role)){
           return  res.json({
                ok:false,
                msg:'El usuario no tiene el rol necesario para hacer esta accion'
            })
        }
        next();
    }
}

module.exports = validarRoles;