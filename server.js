/* Purpose

Set up the path for the root /
Set up the middleware for JSON and URLencoding
Set up the path for the notesRoutes

*/

const express = require('express')
const mongoose = require('mongoose')
const NotesRoutes = require('./routes/NotesRoutes')

const PORT = process.env.PORT || 8081
const DB_URL = "mongodb+srv://noelabilondakabundi_db_user:bU3BT7DTHaTCCnNE@week06cluster.f2rdnap.mongodb.net/NotesDB"

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set up the route to the root / path
app.get("/", (request, response) => {
    response.send("<h1>Welcome to the root path of the server</h1>")
})

// Set up the route to the routes set up in the routes/NotesRoutes.js file
app.use("/api", NotesRoutes)

// Set up the connection to the MongoDB using our connection string
// and mongoose framework
mongoose.connect(DB_URL)
.then(() => {
    console.log("Successfully connected to the MongoDB Atlas server")
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
    console.log("Could not connect to the MongoDB server:")
    process.exit(1)
})

module.exports = app