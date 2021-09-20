const mongoose = require('mongoose'); 

const dbConection =async()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_CNN,{
            useCreateIndex:true,
            useFindAndModify:false,
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('DB conectada');
        return conn;
    } catch (error) {
        console.log('Error al levantar la base de datos',error)
    }
}

module.exports = dbConection;