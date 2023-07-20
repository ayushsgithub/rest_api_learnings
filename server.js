require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.once('open', () => console.log('Connected to database'))
db.on('error', (error)=> console.log("here's the error", error))

app.use(express.json())

const restRouter = require('./routes/rest')
app.use('/rest', restRouter)



app.listen(3000, () => console.log("Server Started"))