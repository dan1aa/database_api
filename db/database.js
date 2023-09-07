const mysql = require('mysql')
const { config } = require('dotenv')
config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
})

connection.connect(err => {
    if(err) throw new Error(err)
    else console.log('connected to db')
})

module.exports = connection;