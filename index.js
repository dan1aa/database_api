const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express()
app.use(cors({ origin: '*' }))

app.use(bodyParser())

// routes

const routes = require('./routes/routes')
app.use(routes)



app.listen(5000, () => {
    console.log('Server is online on 5000')
})

