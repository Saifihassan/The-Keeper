const express = require('express')
const authRoutes = require('../src/routes/auth.route')
const cookieparser = require('cookie-parser')
const noteRoutes = require('./routes/notes.route')
const cors = require('cors')
const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookieparser())
app.use("/api/auth",authRoutes)
app.use("/api/notes",noteRoutes)

module.exports = app