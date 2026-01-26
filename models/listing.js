const moongoose = require("mongoose");
const Schema = moongoose.Schema;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
  filename: String,
  url: {
    type: String,
    set:(v) =>
      v===""
      ?"https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
      :v
  }
},

  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  geometry: {
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default:"Point"
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    default:[0,0]

  }
},
  category:{
    type:String,
    enum:["Trending",
      "Rooms",
      "Iconic Cities",
      "Mountain",
      "Castles",
      "Arctic",
      "Camping",
      "Farms",
    "Domes",
  "Boats"]
  }

});

const Listing = moongoose.model("Listing", listingSchema);
module.exports = Listing;