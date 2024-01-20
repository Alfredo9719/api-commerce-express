const {response, request} = require('express'); //Se crea la constante de response y request
const Products = require('../models/Product.model');

const productsGet = async (req = request, res = response)=> {// se crea una constante con funcion flecha
    const product = await Products.find();//para buscar los datos de la bd
    res.status(200).json({
        message:"datos cargados correctamente",
        data: product
    });
}

const productsPost = async (req = request, res = response)=> {// se crea una constante con funcion flecha
    const body = req.body; //para recuperar la informacion del body
    let product = Products(body);//lo mandamos a la base de datos
    await product.save();//lo guardamos en la base de datos

    res.status(200).json({
        message:"Datos agregados correctamente",
        data: body
    });
}

const productsPut = async (req = request, res = response)=> {
    //tarea
    //realizar el put 
    //Crear modelo, rutas y controller de usuarios
    const {id }= req.query;
    const body = req.body;
    const dataUpdate = await Products.findByIdAndUpdate(id, body, {new: true});
    res.status(200).json({
        message:"Datos actualizados correctamente",
        data: dataUpdate
    });
}

const productsDelete = async (req = request, res = response)=> {// se crea una constante con funcion flecha
    const {id} = req.query;//recolecta informacion con la liga la cual es ?id=
    await Products.findByIdAndDelete(id);
    res.status(200).json({
        message:"Registro eliminado correctamente",
        data: id
    });
}

//importante exportarlas para poder usarlas
module.exports = {
    productsGet,
    productsPost,
    productsPut,
    productsDelete
}