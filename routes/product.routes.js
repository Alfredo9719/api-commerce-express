const { Router } = require("express"); //importa Routes de express
const { productsGet, productsPost, productsPut, productsDelete } = require("../controllers/product.controller"); //se definen los controladores
const router = Router();// se define en constante un router

const guardToken = require('../middleware/auth.middleware');


router.get('/products', productsGet); //se mandan a llamar las rutas con el controlador
router.post('/products', guardToken, productsPost);
router.put('/products', productsPut);
router.delete('/products', productsDelete);

module.exports = router; //se exporta las rutas

