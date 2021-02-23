// Importación del paquete
const mongoose = require('mongoose');
require('dotenv').config();

// mean_user:E9jsjkWnkeLdN4im

// La hacemos asíncrona para que el sistema espere
// Lo que genera el async es que devuelve una promesa
const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online.');
    } catch (error) {
        console.log(error);
        throw new Error('Error a ala hora de iniciar la base de datos. Ver logs.');
    }

};


// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
module.exports = {
    dbConnection
}