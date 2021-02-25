/*
    Funciones que se van a exportar
    para los callbacks de las llamadas.
*/
// Se recomienda el uso de UpperCamelcase por que se trata de una clase
const Usuario = require('../models/usuario')
// Para obetener las ayudas del visual studio sobre los objetos res y req
const { response } = require('express');
// npm i bcryptjs
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    // Usuario que realiza la consulta, obtenido en validarJWT
    const { role } = await Usuario.findById(req.uid);
    if(role!=='ADMIN'){
        res.status(401).json({
            ok: true,
            msg: 'No tiene permisos para realizar esta consulta'
        });
    }

    const usuarios = await Usuario.find({}, ['nombre', 'email']);
    res.status(200).json({
        ok: true,
        usuarios
    });
};

const addUsuario = async (req, res = response) => {

    const { passwd, email } = req.body;
    try {
        // Validar campo email, ya registrado en BD
        // Se trata de una promise a la que queremos esperar
        const existeEmail = await Usuario.findOne({ email });
        // Se trata de una promise a la que queremos esperar
        if (existeEmail) {
            return res.status(500).json({
                ok: false,
                msg: 'Email ya registrado.'
            });
        }
        const usuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.passwd = bcrypt.hashSync(passwd, salt);

        await usuario.save();

        // Generar el token
        console.log(usuario);
        const token = await generarJWT(usuario.id)
            .then((token) => { return token })
            .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    msg: error
                });
            });

        return res.status(200).json({
            ok: true,
            usuario
        });

    } catch (err) {
        return res.status(500).json({
            ok: false,
            msg: err.message
        });
    }
};

const modifyUsuario = async (req, res = response) => {
    // TODO: Validar token y ver si es el usuario correcto
    const uid = req.params.id;
    try {
        // Buscamos un usario en BD con ese id
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no registrado en BD con ese id.'
            });
        }
        // Actualizaciones
        const { passswd, google, email, ...campos } = req.body;
        // Si no está modificando el email, lo quitamos, para evitar conflictos
        if (usuarioDB.email !== email) {
            // Buscamos en BD registros con ese email
            const existeEmail = await Usuario.findOne({ email });
            // Si el nombre de la variable no coincide con el nombre del campo se lo debemos indicar
            // const existeEmail = await Usuario.findOne({ email: varEmail });
            if (existeEmail) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Email ya registrado.'
                });
            }
            campos.email = email;
        }

        console.log(uid);
        console.log(campos);
        // findByIdAndUpdate por defecto devuelve el registro antes del update.
        // No sirve para nada, es necesario new: true en las options para obtener el ya actualizado
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        return res.status(200).json({
            ok: true,
            usuarioActualizado
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            msg: err.message
        });
    }
};

/**
 * Normalemnete más que borrar un registro
 * se recomienda indidcar ele stado con un boolean
 */
const deleteUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {
        // Buscamos un usario en BD con ese id
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe el usuario con ese id."
            });
            
        }
        await Usuario.findByIdAndDelete(uid);
        return res.status(200).json({
            ok: true,
            uid
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
};

module.exports = {
    getUsuarios,
    addUsuario,
    modifyUsuario,
    deleteUsuario
};