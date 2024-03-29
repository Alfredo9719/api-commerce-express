const {response, request} = require('express'); //Se crea la constante de response y request
const Users = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;


const usersGet = async (req = request, res = response)=> {// se crea una constante con funcion flecha
    // const user = await Users.find();//para buscar los datos de la bd
    const tokenInfo = req.user; //Recupera info del token
    const profileRaw = await Users.findById(tokenInfo); //y busca un usuario en especial firmado
    const profile = {
        name: profileRaw.name,
        last_name: profileRaw.last_name,
        email: profileRaw.email,
        dob: profileRaw.dob
    };
    res.status(200).json({
        message:"datos cargados correctamente",
        data: profile //Regresa el usuario
    });
}

const usersPost = async (req = request, res = response)=> {// se crea una constante con funcion flecha
    const body = req.body; //para recuperar la informacion del body
    let user = Users(body);//lo mandamos a la base de datos
    user.password = await bcrypt.hash(user.password, salt);//es para encriptar contraseña con libreria bcrypt
    await user.save();//lo guardamos en la base de datos

    res.status(200).json({
        message:"Datos agregados correctamente",
        data: body
    });
}

const usersPut = async (req = request, res = response)=> {
    //tarea
    //realizar el put 
    //Crear modelo, rutas y controller de usuarios
    const id = req.user.id;
    const body = req.body;

    if (body.password != null && body.password != "") { //Si esta vacio el campo contraseña o es nulo
        body.password = await bcrypt.hash(body.password, salt); //Encriptala para mandarla
    } else {
        delete body.password; //Elimina si es lo contrario
    }
    const dataUpdate = await Users.findByIdAndUpdate(id, body, {new: true});
    res.status(200).json({
        message:"Datos actualizados correctamente",
        data: dataUpdate
    });
}

const usersDelete = async (req = request, res = response)=> {// se crea una constante con funcion flecha
    const {id} = req.query;//recolecta informacion con la liga la cual es ?id=
    await Users.findByIdAndDelete(id);
    res.status(200).json({
        message:"Registro eliminado correctamente",
        data: id
    });
}

const loginPost = async (req = request, res = response) => {
    const body = req.body;
    const userInformationDb = await Users.findOne({email: body.email, active: true});
    if(userInformationDb == null){
        res.status(404).json({
            message:"user not found or not active.",
            data: "null"
        });
    }

    // bcrypt.compare(plainPassword, hashpassword);
    const comparePassword = await bcrypt.compare(body.password, userInformationDb.password);

    if (comparePassword == false) {
        res.status(404).json({
            message:"invalid password.",
            data: "null"
        });
    }

    const payload = {
        id: userInformationDb._id,
        full_name: `${userInformationDb.name} ${userInformationDb.last_name}`,
        email: userInformationDb.email
    };

    res.status(200).json({
        message:"Login Succes",
        data: jwt.sign(payload, process.env.JWT_SIGNATURE)
    });
}

//importante exportarlas para poder usarlas
module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    loginPost
}