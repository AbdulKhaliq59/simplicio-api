import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  try {
    // Seed users
    await seedUsers();

    console.log('Seed data inserted successfully');
    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error.message);
    mongoose.connection.close();
  }
});

const seedUsers = async () => {
  // Define seed data
  const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin@12345',
      dateOfBirth: new Date('1990-01-01'),
      role: 'admin',
    },
    {
      name: 'Super Admin User',
      email: 'superadmin@example.com',
      password: 'superadmin@12345',
      dateOfBirth: new Date('1980-01-01'),
      role: 'superAdmin',
    },
    {
      name: 'Normal User',
      email: 'normal@example.com',
      password: 'normal@12345',
      dateOfBirth: new Date('2000-01-01'),
      role: 'normal',
    },
  ];

  // Insert seed data into the database
  await User.insertMany(users);
};
