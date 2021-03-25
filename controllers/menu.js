const { response } = require('express');

const Usuario = require('../models/usuario')

const getMenu = async (req, res = response) => {
    
    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu: [
            {
              title: 'Main',
              url: '',
            },
            {
              title: 'ProgressBar',
              url: 'progress',
            },
            {
              title: 'Grafica',
              url: 'grafica',
            },
            {
              title: 'Promesas',
              url: '/dashboard/promesas',
            },
            {
              title: 'Rxjs',
              url: '/dashboard/rxjs',
            },
          ]
        },
        {
          title: 'Mantenimiento',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            {
              title: 'Hospitales',
              url: 'hospitales',
            },
            {
              title: 'Médicos',
              url: 'medicos',
            }
          ]
        }
      ];


    const usuarioDB = await Usuario.findById(req.uid);
    if(!usuarioDB){
        return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }

    if(usuarioDB.role === 'ADMIN_ROLE') {
        // menu[1].submenu.splice(0, 0, { title: 'Usuarios', url: 'usuarios', });
        menu[1].submenu.unshift( { title: 'Usuarios', url: 'usuarios', });
    }
    try {
        return res.status(200).json({
            ok: true,
            msg: 'Todo ok.',
            menu
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};

module.exports = {
    getMenu
}
