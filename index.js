const express = require('express');
require('dotenv').config();
const app = express();
const puerto = process.env.PORT;
// Sin esta linea cuando se suba a produccion no funcionaria.
const cors = require('cors');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const { dbConection } = require('./database/config');

// Middleware's
app.use(cors());
// sin esta linea no podriamos recibir datos en formato JSON en los POST
app.use(express.json());


(async ()=>{//funcion anonima con funcion de flecha
//.... cargar base de datos con la funcion async por que es promesa
await dbConection();

app.use(productRoutes); //cargar rutas
app.use(userRoutes);
})();


app.listen(puerto, () => {
    console.log('Servidor escuchando en http://localhost:' + puerto);
});