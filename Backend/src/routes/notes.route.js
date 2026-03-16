const express = require("express")
const noteController = require('../controllers/notes.controller')
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router()


router.get("/",authMiddleware,noteController.getAllNotes)
router.post('/create',authMiddleware,noteController.createNotes)
router.put("/:id",authMiddleware,noteController.updateNote)
router.delete('/:id',authMiddleware,noteController.deleteNote)

module.exports = router