import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import Admins from '../model/admins.js';
import Ideas from '../model/ideas.js';
import Fundings from '../model/fundings.js';

const database = {};

const credentials = {
    host: "localhost",
    user: "root",
    password: "",
    database: "FundingPage"
}

try {
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    })
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${credentials.database}`)
    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {dialect: "mysql"});
    database.Admins = Admins(sequelize)
    database.Ideas = Ideas(sequelize)
    database.Fundings = Fundings(sequelize)

    database.Ideas.hasMany(database.Fundings)
    database.Fundings.belongsTo(database.Ideas)

    await sequelize.sync({alter: true})
}
catch(error) {
    console.log(error)
    console.log("Nepavyko prisijungti prie duomenu bazes")
}

export default database;
