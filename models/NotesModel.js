/*
Purpose

Define the table in JSON format for Mongo & Mongoose
 */

const mongoose = require("mongoose")
const noteSchema = mongoose.Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteDescription: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        required: true,
        uppercase: true
    },
    dateAdded: {
        type: String,
        required: true,
        default: new Date().toISOString()
    },
    dateUpdated: {
        type: String,
        required: true,
        default: new Date().toISOString()
    }
}, {
    timestamps: false
})

module.exports = mongoose.model("NotesSchema", noteSchema)