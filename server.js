const express = require('express')
const app = express()
const connectDB = require('./db')

connectDB()

app.use(express.json())

const server = app.listen(process.env.PORT||PORT, () => console.log(`Server is running on port: ${process.env.PORT} `))

process.on('unhandledRejection', err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})