const { Schema, model } = require('mongoose');//Se manda a llamar las variables de mongoose

const UsersSchema = Schema({
    name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    active: {
        type: Boolean
    },
    dob: {
        type: Date
    },
    notes: {
        type: String
    },
}, { vesionKey: false });

module.exports = model('User', UsersSchema);