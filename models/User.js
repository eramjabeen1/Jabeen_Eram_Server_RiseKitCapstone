import mongoose from 'mongoose'

/*importing bcrypt so i can hash passwords before saving them. bcrypt is a library that helps us hash passwords so theyre
secure before being saved in our database. we never store plain text passwords. bcrypt scrambles the password into a 
hashed version that cant be reversed so when a user logs in, we compare the entered password (after hashing it again) 
with the one stored in the database.*/
import bcrypt from 'bcrypt'


// setting up the structure for a user
const userSchema = new mongoose.Schema({
  // requiring a username and making sure its unique and trimmed
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // storing the password here (it will be hashed before saving)
  password: {
    type: String,
    required: true
  }
})

// running this function before saving the user to the database
// this checks if the password is new or has been changed
userSchema.pre('save', async function (next) {
  // skipping hashing if the password hasnt changed
  if (!this.isModified('password')) return next()

  // hashing the password with bcrypt using 10 salt rounds
  //salt is  random string added to the password before hashing
  // and rounds is how many times the hashing algorithm processes 
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// adding a method to check if the entered password matches the saved one
userSchema.methods.comparePassword = function (enteredPassword) {
  // comparing the entered password with the hashed one
  return bcrypt.compare(enteredPassword, this.password)
}

// creating and exporting the User model so it can be used in other files
const User = mongoose.model('User', userSchema)
export default User
