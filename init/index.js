const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const data = require("./data");
require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);

  // 👇 find your user
  const user = await User.findOne({ username: "Fathema" });

  // add owner to each listing
  const listingsWithOwner = data.data.map(obj => ({
    ...obj,
    owner: user._id,
  }));

  await Listing.deleteMany({});
  await Listing.insertMany(listingsWithOwner);

  console.log("Seeded with owner");
  mongoose.connection.close();
}

main();
