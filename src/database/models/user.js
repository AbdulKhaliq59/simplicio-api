import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'normal'],
    default: 'normal',
  },
});

const User = mongoose.model('User', userSchema);

export default User;
