const express = require("express")
const router = express.Router()

const {
    createRating,
    getAverageRating,
    getAllRating
}=require("../controllers/RatingAndReview");

router.get("/getaveragerating",getAverageRating)

module.exports = router;