const { connect } = require('mongoose')
const NoteModel = require('../models/notes.model')


async function getAllNotes(req,res) {
    const userId = req.user.id
    const notes = await NoteModel.find({ user: userId })

    res.status(200).json({
        message:"Notes fetched!",
        notes
    })
    
}

async function createNotes(req,res) {

    const {title,content} = req.body

    const newNote = await NoteModel.create({
        title,
        content,
        user:req.user.id
    })
    
    res.status(201).json({
        message:"Note created",
        newNote
    })
}

async function updateNote(req,res){
    const {id} = req.params
    const {title,content} = req.body
    const noteToUpdate = await NoteModel.findByIdAndUpdate(
        { _id: id, user: req.user.id },
        { title, content },
        { returnDocument:"after" }
    )

    if (!noteToUpdate) {
        return res.status(404).json({
            message: "Note not found or you don't have permission to update it"
        })
    }

    res.status(200).json({
        message:"Note updated",
        noteToUpdate
    })

}

async function deleteNote(req,res) {
    const {id} = req.params

    const noteToDelete = await NoteModel.findByIdAndDelete({ _id: id, user: req.user.id })

    if (!noteToDelete) {
        return res.status(404).json({
            message: "Note not found or you don't have permission to delete it"
        })
    }

    res.status(200).json({
        message:"Note deleted!"
    })
    
}

module.exports ={
    getAllNotes,
    createNotes,
    updateNote,
    deleteNote
}