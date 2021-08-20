const Role = require('../models/role');

const customRol = async( role = '')=>{
    const validar = await Role.findOne({role});
    if(!validar){
        throw new Error(`El rol ${role} no existe`);
    }
}

module.exports = {
    customRol
}