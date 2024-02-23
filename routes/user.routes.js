const { Router } = require("express"); //importa Routes de express
const { usersGet, usersPost, usersPut, usersDelete, loginPost } = require("../controllers/user.controller"); //se definen los controladores
const router = Router();// se define en constante un router
const chkToken = require('../middleware/auth.middleware');


router.get('/users', chkToken , usersGet); //se mandan a llamar las rutas con el controlador
router.post('/users', usersPost);
router.post('/login', loginPost);
router.put('/users', chkToken ,usersPut);
router.delete('/users', usersDelete);

module.exports = router; //se exporta las rutas

