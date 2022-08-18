const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require("morgan")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const appRoute = require('./src/router')

dotenv.config()
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
 
// app.use('/uploads/', express.static('uploads/'))
app.use('/uploads/admin', express.static('uploads/admin/'))

app.get('/', async (req, res) => {
    res.send("Wow!😯 are you here🙃🙃 but you have no access!!! 😜😜😜")
})
app.use('/api/v1', appRoute)


app.use((req, res, next) => {
    let error = new Error('404 page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        return res.status(404).json({
            status: false,
            errors: { message: error.message }
        })
    }

    if (error.status == 400) {
        return res.status(400).json({
            status: false,
            errors: { message: "Bad request" }
        })
    }

    if (error.status == 401) {
        return res.status(401).json({
            status: false,
            errors: { message: "You have no permission." }
        })
    }

    return res.status(500 || 501).json({
        status: false,
        errors: { message: "Internal server error." }
    })
})

// DB Connection here
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Database connected"))
    .catch(error => {
        if (error) console.log('Failed to connect DB')
    })

// App Port
const port = 4000
app.listen(port, () => {
    console.log(`App running on ${port} port`)
}) 