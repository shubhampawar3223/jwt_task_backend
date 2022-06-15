const express = require("express")
const cors = require('cors')
require('dotenv').config()
const db = require("./models")
const morgan = require('morgan')
const winston = require('./utils/winston')
const app = express()
const PORT = process.env.PORT || 3100

app.use(cors())
app.use(express.json())
app.use(morgan('combined', { stream: winston.stream }));

const apiRoutes = require('./routes/apiRoutes')
app.use('/api',apiRoutes)

//connecting to the db.
db.sequelize.sync().then(()=>{
    app.listen(PORT,()=>console.log(`Server is listening on ${PORT}`))
})