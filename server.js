const express = require('express')
const app = express()
const connectDB = require('./db')
const cookieParser = require('cookie-parser')
const {adminAuth, userAuth} = require('./middleware/auth')

app.set("view engine", "ejs")

connectDB()

app.use(express.json())
app.use(cookieParser())

app.use('/api/Auth', require('./Auth/Route'))

app.get('/', (req, res) => res.redirect('home'))
app.get('/register', (req, res) => res.redirect('register'))
app.get('/login', (req, res) => res.redirect('login'))
app.get('/admin', adminAuth, (req, res) => res.render("admin"))
app.get('/basic', userAuth, (req, res) => res.render("user"))

const server = app.listen(process.env.PORT||PORT, () => console.log(`Server is running on port: ${process.env.PORT} `))

process.on('unhandledRejection', err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})