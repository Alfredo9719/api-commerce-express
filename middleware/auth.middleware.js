const jwt = require('jsonwebtoken');

const chkToken = async (req, res, next) => {// next significa sigue con el proceso
    try {
        const headers = req.headers;  // recupera informacion del header
        if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {// separa las posiciones
            const token = headers.authorization.split(' ')[1];//Recupera el token de la posicion 1 separada
            if (jwt.verify(token, process.env.JWT_SIGNATURE)) {//si es true o igual sigue el proceso
                req.user = jwt.decode(token); //El token este guardado en su decodificacion para ver un solo usuario
                next();//continua con el proceso
            }

        } else {
            res.status(401).json({
                msg: 'No hay token Bearer'
            });
        }
    } catch (error) {
        res.status(401).json({
            msg: error.message
        });
    }
};

module.exports = chkToken;