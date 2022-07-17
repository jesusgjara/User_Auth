const express = require('express')
const app = express()
const connectDB = require('./db')
const cookieParser = require('cookie-parser')
connectDB()

app.use(express.json())
app.use(cookieParser())

app.use('/api/Auth', require('./Auth/Route'))

const server = app.listen(process.env.PORT||PORT, () => console.log(`Server is running on port: ${process.env.PORT} `))

process.on('unhandledRejection', err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})