const { Schema, model } = require('mongoose');//Se manda a llamar las variables de mongoose

const ProductsSchema = Schema({
    name: {
        type: String
    },
    descripcion: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    categories: {
        type: Array
    },
    manufacturer: {
        type: String
    },
    sku: {
        type: String
    },
    image: {
        type: String
    },
    active: {
        type: Number
    }
}, { vesionKey: false });

module.exports = model('Products', ProductsSchema);