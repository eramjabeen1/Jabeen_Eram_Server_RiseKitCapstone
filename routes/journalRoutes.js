import express from 'express'
import journalController from '../controllers/journalControllers.js'

const router = express.Router()

// Seed
router.get('/seed', journalController.seedNotes)

// index - get all journal entries
router.get('/', journalController.getNotes)

// show - get one journal entry by ID
router.get('/:id', journalController.getNote)

// create a new journal entry
router.post('/', journalController.createNote)

// update a journal entry by ID
router.put('/:id', journalController.updateNote)

// delete a journal entry by ID
router.delete('/:id', journalController.deleteNote)

export default router
