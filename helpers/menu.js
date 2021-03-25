
const getMenu = (role) => {
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

    if(role === 'ADMIN_ROLE') {
        // menu[1].submenu.splice(0, 0, { title: 'Usuarios', url: 'usuarios', });
        menu[1].submenu.unshift( { title: 'Usuarios', url: 'usuarios', });
    }
    
    return menu;
};

module.exports = {
    getMenu
};