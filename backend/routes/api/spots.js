const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User } = require("../../db/models");
const { Op } = require("sequelize");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({});

  for (let spot of spots) {
    previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true,
      },
      attributes: ["url"],
    });
    if (previewImage)
      spot.dataValues.previewImage = previewImage.dataValues.url;

    const reviews = await Review.findAndCountAll({
      where: {
        spotId: spot.id,
      },
      attributes: ["stars"],
    });

    reviewSum = reviews.rows.reduce((accum, curr) => {
      return (accum = accum + curr.dataValues.stars);
    }, 0);
    avgRating = reviewSum / reviews.count;
    spot.dataValues.avgRating = avgRating;
  }

  return res.json({ Spots: spots });
});

// Get all spots owned by the current user
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const spots = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
  });

  for (let spot of spots) {
    previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true,
      },
      attributes: ["url"],
    });
    if (previewImage)
      spot.dataValues.previewImage = previewImage.dataValues.url;

    const reviews = await Review.findAndCountAll({
      where: {
        spotId: spot.id,
      },
      attributes: ["stars"],
    });

    reviewSum = reviews.rows.reduce((accum, curr) => {
      return (accum = accum + curr.dataValues.stars);
    }, 0);
    avgRating = reviewSum / reviews.count;
    spot.dataValues.avgRating = avgRating;
  }

  res.json({ Spots: spots });
});

// Get spot from an id
router.get("/:spotId", async (req, res, next) => {
  const spotId = Number(req.params.spotId);

  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        attributes: {
          exclude: ["createdAt", "updatedAt", "spotId"],
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
