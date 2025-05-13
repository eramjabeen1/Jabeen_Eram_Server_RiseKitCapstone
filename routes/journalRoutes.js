import express from 'express'
import journalController from '../controllers/journalControllers.js'
import requireAuth from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/seed', journalController.seedNotes)

// protecting routes below
router.use(requireAuth)

router.get('/', journalController.getNotes)
router.get('/:id', journalController.getNote)
router.post('/', journalController.createNote) // user linking happens in controller
router.put('/:id', journalController.updateNote)
router.delete('/:id', journalController.deleteNote)

export default router
