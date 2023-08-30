const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { config } = require('dotenv')
config()

const app = express()
app.use(cors({ origin: '*' }))

const routes = require('./routes/routes')
app.use(routes)

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

connection.query('SELECT * FROM course', (err, res, fields) => {
    if(err) console.log(err)
    let result = Object.values(JSON.parse(JSON.stringify(res)));
    console.log(result)
})

app.listen(5000, () => {
    console.log('Server is online on 5000')
})