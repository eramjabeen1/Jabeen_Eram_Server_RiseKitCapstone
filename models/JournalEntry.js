import mongoose from 'mongoose'

const journalEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'motivated', 'tired', 'neutral'],
    default: 'neutral'
  },

 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
 }

}, {
  timestamps: true
})


const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema)



export default JournalEntry
