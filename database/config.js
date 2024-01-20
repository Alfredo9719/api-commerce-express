const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Conexion a Base de datos realizada con exito!!")
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de conectar con la base de datos...");
    }
}

module.exports = {
    dbConection
}