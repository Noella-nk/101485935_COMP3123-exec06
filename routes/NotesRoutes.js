/*
Purpose:
Set up all of the routes/paths for our server
 */

const express = require('express')
const notesRoutes = express.Router()
const NotesModel = require('../models/NotesModel.js')

// Fill in the routes and methods below from the lab instructions

// 
function getValidContent(request) {
    if (!request.body || !request.body.content) {
        return null;
    }
    return request.body.content;
}

notesRoutes.post("/notes", async (request, response) => {
    // Validation of the POST body
    if (!request.body.content) {
        return response.status(400).send({ 
            message: "Note content in the POST body cannot be left empty" 
        })
    }

    // If the content of the body existed
    try {
        const note = new NotesModel({
            noteTitle: request.body.content.noteTitle,
            noteDescription: request.body.content.noteDescription,
            priority: request.body.content.priority,
            dateAdded: request.body.content.dateAdded,
            dateUpdated: request.body.content.dateUpdated
        })

        const savedNote = await note.save()
        response.status(201).send(savedNote)
    } catch (error) {
        response.status(500).send({ 
            message: error.message || "Some error occurred while creating the note from the database"
        })
    }  

})

notesRoutes.get("/notes", async (request, response) => {
    try {
        const notes = await NotesModel.find()
        return response.status(200).send(notes)
    } catch (error) {
        return response.status(500).send({ 
            message: error.message || "Some error occurred while retrieving the notes from the database"
        })
    }
})

notesRoutes.get("/notes/:noteId", async (request, response) => {
    try {
        const notes = await NotesModel.findById(request.params.noteId)
        if (!notes) {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            })
        }
        return response.status(200).send(notes)
    } catch (error) {
        return response.status(500).send({
            message: error.message || "Error retrieving note "
        })
    }
})

notesRoutes.put("/notes/:noteId", async (request, response) => {
    const content = getValidContent(request)

    if (!content) {
        return response.status(400).send({
            message: "Note content in the PUT body cannot be empty"
        })
    }

    try {
        const updatedNote = await NotesModel.findByIdAndUpdate(
            request.params.noteId,
            {
                noteTitle: content.noteTitle,
                noteDescription: content.noteDescription,
                priority: content.priority ? content.priority.toUpperCase() : undefined,
                dateUpdated: new Date()
            },
            { new: true, runValidators: true }
        )

        if (!updatedNote) {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            })
        }

        return response.status(200).send(updatedNote)

    } catch (error) {
        return response.status(500).send({
            message: error.message || "Error updating note"
        })
    }
})

notesRoutes.delete("/notes/:noteId", async (request, response) => {
    try {
        const deletedNote = await NotesModel.findByIdAndDelete(request.params.noteId)

        if (!deletedNote) {
            return response.status(404).send({
                message: "Note not found with id " + request.params.noteId
            })
        }

        return response.status(200).send({
            message: "Note deleted successfully"
        })
    } catch (error) {
        return response.status(500).send({
            message: error.message || "Error deleting note"
        })
    }
})

// Required homework
module.exports = notesRoutes