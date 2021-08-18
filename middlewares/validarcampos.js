const { validationResult } = require("express-validator");

const validarCampos = (req, res, next)=>{
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.json(err);
    }
    next();
}

module.exports = validarCampos;