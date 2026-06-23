const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Define clean, flexible models right here inside the script
const Company = mongoose.models.Company || mongoose.model('Company', new mongoose.Schema({}, { strict: false }));
const Thread = mongoose.models.Thread || mongoose.model('Thread', new mongoose.Schema({}, { strict: false }));

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('Connected safely.');

    // Read the local JSON structural files
    const companies = JSON.parse(fs.readFileSync('./seedData/companies.json', 'utf-8'));
    const threadsRaw = JSON.parse(
  fs.readFileSync('./allThreads.json', 'utf-8')
);

    // Extract results array if the JSON still has the meta wrapper wrapper
    const threads = Array.isArray(threadsRaw) ? threadsRaw : (threadsRaw.results || []);

    if (companies.length === 0 || threads.length === 0) {
        console.log('Error: Check your JSON files. One of them appears to be empty or malformed.');
        process.exit(1);
    }

    // Clear out existing documents to prevent duplicate primary key collisions
    await Company.deleteMany({});
    await Thread.deleteMany({});

    // Bulk insert operational rows
    await Company.insertMany(companies);
    console.log(`Successfully seeded ${companies.length} companies.`);

    await Thread.insertMany(threads);
    console.log(`Successfully seeded ${threads.length} threads.`);

    console.log('Database seeding process completed successfully! 🎉');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();