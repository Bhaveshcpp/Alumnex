const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Company = require("./models/Company.model");

const logos = {
  google: "google.svg",
  microsoft: "microsoft.svg",
  amazon: "amazon.svg",
  adobe: "adobe.svg",
  oracle: "oracle.svg",
  flipkart: "flipkart.svg",
  infosys: "infosys.svg",
  wipro: "wipro.svg",
  tcs: "tata.svg",
  zoho: "zoho.svg",
  celebal: "celebal.png",
};

async function updateLogos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const companies = await Company.find();

    for (const company of companies) {
      const logo = logos[company.slug];

      if (logo) {
        company.logo = logo;
        await company.save();
        console.log(`Updated ${company.name}`);
      } else {
        console.log(`No logo found for ${company.name}`);
      }
    }

    console.log("✅ All logos updated.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateLogos();