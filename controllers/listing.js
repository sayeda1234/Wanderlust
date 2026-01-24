const Listing = require("../models/listing");
const geocodeLocation = require("../utils/geocode");
const axios = require("axios");


module.exports.index=async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

module.exports.renderNewForm=(req,res)=>{
    res.render('listings/new');
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:'reviews', populate:{path:'author'}}).populate('owner');
    if(!listing){
      req.flash("error","Cannot find that listing");
      res.redirect("/listings");
    }
    res.render('listings/show',{listing});
}


module.exports.createListing = async (req, res) => {
  const { location } = req.body.listing;

  // 🌍 get lat & lng
  const coords = await geocodeLocation(location);

  const listing = new Listing(req.body.listing);

  // ✅ SAVE COORDINATES
  listing.geometry = {
    type: "Point",
    coordinates: [coords.lng, coords.lat]
  };

  // optional image
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  listing.owner = req.user._id;
console.log("GEOMETRY:", listing.geometry);



  await listing.save();

  req.flash("success", "Listing created successfully");
  res.redirect(`/listings/${listing._id}`);
};



module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing)
    {
        req.flash("error","Listing you requested does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
   originalImageUrl= originalImageUrl.replace("/upload","/upload/h_200,w_300")
    res.render('listings/edit',{listing, originalImageUrl});
}

module.exports.updateListing=async (req, res) => {
     const { id } = req.params;
      console.log(req.body); 
  const listing=await Listing.findByIdAndUpdate(
    id,
    req.body.listing,
    { runValidators: true, new: true }
  );
  if(typeof req.file!=="undefined")
  {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image={url,filename};
    await listing.save();
  }
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
       let deletedListing= await Listing.findByIdAndDelete(id);
       console.log(deletedListing);
        res.redirect('/listings');
    };

