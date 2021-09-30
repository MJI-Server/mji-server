const { v4:uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = (files,extensionesValidas = ['docx','pdf','txt'], carpeta = '')=>{

    return new Promise((resolve, reject)=>{

        const {archivo} = files;
        const nombreCortado = archivo .name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar la extension
        if(!extensionesValidas.includes(extension)){
            return reject(`La extension ${extension} no es permitida - ${extensionesValidas}`);
        };
        
        
        const nombreTemporal = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemporal);

        archivo.mv(uploadPath, (err) => {
            if (err) {
             reject(err);
            }

             resolve(nombreTemporal);
        });
        })
    
}

module.exports = {
    subirArchivo
}