const express = require('express')
const conn =  require('./database/config.js')
const empleados = require('./routes/empleados.route.js')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json());
app.use('/empleados', empleados)


const PORT = 5000
app.listen(PORT, () => console.log("server on port 5000"))