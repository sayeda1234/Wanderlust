const mongoose=require('mongoose');
const initdata=require('./data');
const Listing=require('../models/listing');

main().then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initdata.data.map((obj)=>({ ...obj,owner:"6487f3f4f0d5c4b1a4e8b123"}));
    await Listing.insertMany(initdata.data);
    console.log("Database initialized with sample data");
};
initDB();
