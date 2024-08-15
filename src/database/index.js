const Sequelize = require('sequelize')
const dbConfig  = require('../config/database.js')
const connection = new Sequelize(dbConfig)
const Barber = require('../app/models/Barber.js')
const Barbershop = require('../app/models/Barbershop.js')
const Client = require('../app/models/Client.js')
const Cut = require('../app/models/Cut.js')


Barber.init(connection)
Barbershop.init(connection)
Client.init(connection)
Cut.init(connection)

Barber.associate(connection.models)
Barbershop.associate(connection.models)
Client.associate(connection.models)
Cut.associate(connection.models)


// try {
//     connection.authenticate()
//     console.log('Connection is sucessfully');
// } catch (error) {
//     console.log(`Erro: ${error}`);
// }

module.exports = connection