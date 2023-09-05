const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  return res.json({ Spots: spots });
});

// Get spot from an id
router.get("/:spotId", async (req, res, next) => {
  const spotId = Number(req.params.spotId);

  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (spot) {
    // total reviews
    spot.dataValues.numReviews = await Review.count({
      where: { spotId: spot.id },
    });
    // avg rating
    let reviewSum = await Review.sum("stars", { where: { spotId: spot.id } });
    let avgRating = reviewSum / spot.dataValues.numReviews;
    spot.dataValues.avgRating = avgRating;
    return res.json(spot);
  } else {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot couldn't be found";
    return next(err);
  }
});

module.exports = router;
