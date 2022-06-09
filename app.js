const express = require("express")
const cors = require('cors')
require('dotenv').config();
const app = express()
const db = require("./models")
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


const apiRoutes = require('./routes/apiRoutes')
app.use('/api',apiRoutes)

//connecting to the db.
db.sequelize.sync().then(()=>{
    app.listen(PORT,()=>console.log(`Server is listening on ${PORT}`))
})