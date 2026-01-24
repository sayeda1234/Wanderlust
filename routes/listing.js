const express=require('express');
const router=express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { listingSchema,reviewSchema } = require('../schema');
const ExpressError = require('../utils/ExpressError');
const Listing=require('../models/listing');
const { isLoggedIn, isOwner } = require('../middleware');
const listingController = require('../controllers/listing');
const { render } = require('ejs');
const multer  = require('multer');
const { storage } = require('../cloudConfig');
const upload = multer({ storage });

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errmsg=error.details.map(el=>el.message).join(',');
      throw new ExpressError(400,errmsg);
    }else{
      next();
    }
  };

  router.route('/').
  get(wrapAsync(listingController.index))
  .post(isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));

  
//new route
router.get("/new",isLoggedIn,listingController.renderNewForm
);

// Filter by category
router.get("/category/:name", async (req, res) => {
  const { name } = req.params;

  const filteredListings = await Listing.find({ category: name });

  res.render("listings/index", { allListings: filteredListings });
});

  router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner, upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//edit route
router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));
    


module.exports=router;