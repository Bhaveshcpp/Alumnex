const fs = require("fs");
const axios = require("axios");

async function fetchAllThreads() {
  let allThreads = [];

  for (let page = 1; page <= 43; page++) {
    console.log(`Fetching page ${page}...`);

    const response = await axios.get(
      `https://alumnex.onrender.com/api/threads?page=${page}&limit=12`
    );

    allThreads.push(...response.data.results);

    console.log(
      `Downloaded ${allThreads.length} threads so far`
    );
  }

  fs.writeFileSync(
    "./allThreads.json",
    JSON.stringify(allThreads, null, 2)
  );

  console.log(
    `Finished! Downloaded ${allThreads.length} threads`
  );
}

fetchAllThreads();