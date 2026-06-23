const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Company = require("./models/company.model");
const JobRole = require("./models/jobRole.model");
const Thread = require("./models/thread.model");

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI);

  const threads = await Thread.find({});

  console.log(`Found ${threads.length} threads`);

  for (const thread of threads) {

    // Skip already migrated records
    if (
      typeof thread.company !== "object" ||
      typeof thread.jobRole !== "object"
    ) {
      continue;
    }

    // Company
    let company = await Company.findOne({
      slug: thread.company.slug,
    });

    if (!company) {
      company = await Company.create({
        name: thread.company.name,
        slug: thread.company.slug,
      });
    }

    // JobRole
    let role = await JobRole.findOne({
      title: thread.jobRole.title,
      company: company._id,
    });

    if (!role) {
      role = await JobRole.create({
        title: thread.jobRole.title,
        company: company._id,
      });
    }

    // Replace embedded objects with references
    thread.company = company._id;
    thread.jobRole = role._id;

    await thread.save();
  }

  console.log("Migration complete");
  process.exit();
}

migrate().catch(console.error);