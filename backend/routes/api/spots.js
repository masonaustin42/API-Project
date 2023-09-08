const express = require("express");

const { requireAuth } = require("../../utils/auth");
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
  Booking,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const router = express.Router();

const validateQuery = [
  check("page")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Size must be greater than or equal to 1"),
  check("minLat")
    .optional()
    .isDecimal({ min: -90, max: 90 })
    .withMessage("Minimum latitude is invalid"),
  check("maxLat")
    .optional()
    .isDecimal({ min: -90, max: 90 })
    .withMessage("Maximum latitude is invalid"),
  check("minLng")
    .optional()
    .isDecimal({ min: -180, max: 180 })
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .optional()
    .isDecimal({ min: -180, max: 180 })
    .withMessage("Maximum longitude is invalid"),
  check("minPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional()
    .isDecimal({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

// Get all spots
router.get("/", validateQuery, async (req, res) => {
  const { page, size, maxLat, minLat, maxLng, minLng, minPrice, maxPrice } =
    req.query;
  let queryFilter = {};

  if (size === undefined) {
    queryFilter.limit = 20;
  } else {
    queryFilter.limit = Number(size);
  }

  if (page === undefined) {
    queryFilter.offset = 0;
  } else {
    queryFilter.offset = (page - 1) * queryFilter.limit;
  }

  queryFilter.where = {
    lng: {
      [Op.between]: [
        minLng !== undefined ? minLng : -180,
        maxLng !== undefined ? maxLng : 180,
      ],
    },
    lat: {
      [Op.between]: [
        minLat !== undefined ? minLat : -90,
        maxLat !== undefined ? maxLat : 90,
      ],
    },
    price: {
      [Op.between]: [
        minPrice !== undefined ? minPrice : 0,
        maxPrice !== undefined ? maxPrice : 1000000000,
      ],
    },
  };

  console.log(queryFilter);
  const spots = await Spot.findAll(queryFilter);

  for (let spot of spots) {
    previewImage = await SpotImage.findOne({
      where: {
        spotId: Number(spot.id),
        preview: true,
      },
      attributes: ["url"],
    });
    if (previewImage)
      spot.dataValues.previewImage = previewImage.dataValues.url;

    const reviews = await Review.findAndCountAll({
      where: {
        spotId: Number(spot.id),
      },
      attributes: ["stars"],
    });

    reviewSum = reviews.rows.reduce((accum, curr) => {
      return (accum = accum + curr.dataValues.stars);
    }, 0);
    avgRating = reviewSum / reviews.count;
    spot.dataValues.avgRating = avgRating;
  }

  return res.json({
    Spots: spots,
    page: queryFilter.offset / queryFilter.limit + 1,
    size: queryFilter.limit,
  });
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
    const previewImage = await SpotImage.findOne({
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

// Create a new spot

const validateSpot = [
  check("address").isString().withMessage("Street address is required"),
  check("city").isString().withMessage("City is required"),
  check("state").isString().withMessage("State is required"),
  check("country").isString().withMessage("Country is required"),
  check("lat")
    .not()
    .isString()
    .isDecimal()
    .withMessage("Latitude is not valid"),
  check("lng")
    .not()
    .isString()
    .isDecimal()
    .withMessage("Longitude is not valid"),
  check("name")
    .isLength({ max: 50 })
    .isString()
    .withMessage("Name must be less than 50 characters"),
  check("description").isString().withMessage("Description is required"),
  check("price")
    .not()
    .isString()
    .isDecimal()
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const newSpot = await Spot.create({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    ownerId: req.user.id,
  });
  res.statusCode = 201;
  res.json(newSpot);
});

// Delete a spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;

  const delSpot = await Spot.findByPk(spotId);

  if (!delSpot || delSpot.ownerId !== req.user.dataValues.id) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.message = "Spot couldn't be found";
    return next(err);
  }

  await Spot.destroy({
    where: {
      id: delSpot.dataValues.id,
    },
  });

  return res.json({ message: "Successfully deleted" });
});

// Edit a spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (!spot || spot.ownerId !== req.user.dataValues.id) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.message = "Spot couldn't be found";
    return next(err);
  }

  await Spot.update(
    {
      ...req.body,
    },
    {
      where: {
        id: spotId,
      },
    }
  );

  const newSpot = await Spot.findByPk(spotId);
  return res.json(newSpot);
});

// Get all reviews from spot id
router.get("/:spotId/reviews", async (req, res, next) => {
  const { spotId } = req.params;

  const reviews = await Spot.findByPk(spotId, {
    attributes: [],
    include: {
      model: Review,
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    },
  });

  if (!reviews) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.message = "Spot couldn't be found";
    return next(err);
  }
  return res.json(reviews);
});

// post a review for a spot

const validateReview = [
  check("review").exists().isString().withMessage("Review text is required"),
  check("stars")
    .exists()
    .isInt({ gt: 0, lt: 6 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      err.message = "Spot couldn't be found";
      return next(err);
    }

    const checkExistingReview = await Review.findOne({
      where: { userId: req.user.dataValues.id, spotId },
    });
    if (checkExistingReview) {
      const err = new Error("User already has a review for this spot");
      err.message = "User already has a review for this spot";
      err.status = 404;
      return next(err);
    }

    const newReview = await Review.create({
      spotId,
      review,
      stars,
      userId: req.user.dataValues.id,
    });

    res.statusCode = 201;
    res.json(newReview);
  }
);

// add image to a spot
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(spotId);

  if (!spot || spot.ownerId !== req.user.dataValues.id) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.message = "Spot couldn't be found";
    return next(err);
  }

  const newSpotImg = await SpotImage.create({
    url,
    preview: preview ? true : false,
    spotId,
  });

  return res.json({ url: newSpotImg.url });
});

// get all bookings from spot id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.message = "Spot couldn't be found";
    return next(err);
  }

  let options;
  if (spot.ownerId === req.user.dataValues.id) {
    options = {
      where: { spotId },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    };
  } else {
    options = {
      where: { spotId },
      attributes: ["spotId", "startDate", "endDate"],
    };
  }

  const bookings = await Booking.findAll(options);

  for (let booking of bookings) {
    booking.dataValues.startDate = booking.dataValues.startDate.split(" ")[0];
    booking.dataValues.endDate = booking.dataValues.endDate.split(" ")[0];
  }

  return res.json({ Bookings: bookings });
});

validateBooking = [
  check("endDate")
    .custom((val, { req }) => {
      const endDate = new Date(val);
      const startDate = new Date(req.body.startDate);
      return endDate.getTime() > startDate.getTime();
    })
    .withMessage("endDate cannot come before startDate"),
  handleValidationErrors,
];

router.post(
  "/:spotId/bookings",
  requireAuth,
  validateBooking,
  async (req, res, next) => {
    const id = req.params.spotId;

    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(id, { include: Booking });

    if (!spot || spot.dataValues.ownerId === req.user.dataValues.id) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      err.message = "Spot couldn't be found";
      return next(err);
    }

    for (const booking of spot.Bookings) {
      let errors = {};
      let bookingStart = new Date(booking.dataValues.startDate);
      let bookingEnd = new Date(booking.dataValues.endDate);
      let start = new Date(startDate);
      let end = new Date(endDate);
      if (
        start.getTime() >= bookingStart.getTime() &&
        start.getTime() <= bookingEnd.getTime()
      ) {
        errors.startDate = "Start date conflicts with an existing booking";
      }
      if (
        end.getTime() >= bookingStart.getTime() &&
        end.getTime() <= bookingEnd.getTime()
      ) {
        errors.endDate = "End date conflicts with an existing booking";
      }
      if (errors.startDate || errors.endDate) {
        const err = new Error(
          "Sorry, this spot is already booked for the specified dates"
        );
        err.status = 403;
        err.message =
          "Sorry, this spot is already booked for the specified dates";
        err.errors = errors;
        return next(err);
      }
    }

    const newBooking = await Booking.create({
      startDate,
      endDate,
      spotId: Number(id),
      userId: req.user.dataValues.id,
    });

    res.json(newBooking);
  }
);

module.exports = router;
