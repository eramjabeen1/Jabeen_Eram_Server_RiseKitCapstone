import JournalEntry from '../models/JournalEntry.js'

// seed - optional starter entries
const seedNotes = async (req, res) => {
  try {
    const seedData = [
      { title: 'Welcome', text: 'this is your first journal entry!', mood: 'neutral' },
      { title: 'Progress', text: 'you’re building an emotional streak tracker', mood: 'motivated' }
    ]
    const entries = await JournalEntry.insertMany(seedData)
    res.json(entries)
  } catch (err) {
    res.status(400).json({ error: 'seed failed' })
  }
}

// index - show all journal entries
const getNotes = async (req, res) => {
  try {
    const entries = await JournalEntry.find()
    res.json(entries)
  } catch (err) {
    res.status(500).json({ error: 'could not fetch entries' })
  }
}

// show - one journal entry by id
const getNote = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id)

    if (!entry) {
      return res.status(404).json({ error: 'entry not found' })
    }

    res.json(entry)
  } catch (err) {
    res.status(400).json({ error: 'invalid id format or entry not found' })
  }
}


// create - new journal entry
const createNote = async (req, res) => {
  try {
    const newEntry = await JournalEntry.create(req.body)
    res.status(201).json(newEntry)
  } catch (err) {
    res.status(400).json({ error: 'failed to create journal entry' })
  }
}

// update - update entry by id
const updateNote = async (req, res) => {
  try {
    const updated = await JournalEntry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: 'failed to update entry' })
  }
}

// delete - delete entry by id
const deleteNote = async (req, res) => {
  try {
    const deleted = await JournalEntry.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ error: 'entry not found to delete' })
    }

    res.json({ message: 'entry deleted', deleted })
  } catch (err) {
    res.status(400).json({ error: 'failed to delete entry' })
  }
}


export default {
  seedNotes,
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
}
