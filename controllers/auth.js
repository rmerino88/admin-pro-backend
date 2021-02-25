const { response } = require('express');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const bcrypt = require('bcryptjs');

const login = async (req, res = response) => {

    const { passwd, email } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });
        // Verificar email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Imposible conectar en este momento'
            });
        }

        // Verificar passwd
        const validPasswd = bcrypt.compareSync(passwd, usuarioDB.passwd);
        if (!validPasswd) {
            return res.status(404).json({
                ok: true,
                msg: 'Imposible conectar en este momento / Otra.'
            });
        }

        // Generar el token
        // const token = await generarJWT(usuarioDB._id)
        const token = await generarJWT(usuarioDB.id)
            .then((token) => { return token })
            .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    msg: error
                });
            });

        return res.status(200).json({
            ok: true,
            msg: 'Todo ok.',
            token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    login
}
// Si realizamos el export de esta manera, no compila
// module.exports = login;
