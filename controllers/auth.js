const { response } = require('express');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { getMenu } = require('../helpers/menu');
const { googleVerify } = require('../helpers/google-verify');

const bcrypt = require('bcryptjs');

const googleSignin = async (req, res = response) => {
    try {
        const { token } = req.body;
        const { name, email, picture } = await googleVerify(token);
        // Verficiar si existe un usuario con es email
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        // Si no existe el usuario
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                passwd: '',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
            usuario.passwd = '';
        }
        // Guardar en BD
        await usuario.save();

        // Generar el token
        // const token = await generarJWT(usuarioDB._id)
        const jsonWebToken = await generarJWT(usuario.id)
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
            jsonWebToken,
            menu: getMenu(usuarioDB.role)
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto.',
            token
        });
    }
};

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
            token,
            menu: getMenu(usuarioDB.role)
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

/**
 * No estoy seguro de que este método este funcionando correctamente
 * El token devuelto es visiblemente más corto
 * @param {*} req 
 * @param {*} res 
 */
const renewToken = async (req, res = response) => {
    // No necesitamos enviar el uid porque lo obetenemos en validarJWT
    const uid = req.uid;
    
    const usuario = await Usuario.findById(uid);
    if(!usuario){
        return res.status(500).json({
            ok: false,
            msg: 'No existe un usuario en BBDD asociado al uid.'
        });
    }

    try {
        // Generar el token
        // const token = await generarJWT(usuarioDB._id)
        const token = await generarJWT(uid)
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
            // oldToken: req.header('x-token'),
            // newToken: token,
            token,
            // uidUsuario: uid,
            usuario,
            menu: getMenu(usuario.role)
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    login,
    googleSignin,
    renewToken
}
// Si realizamos el export de esta manera, no compila
// module.exports = login;
