const express = require("express");

const { requireAuth } = require("../../utils/auth");
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Get all reviews of current user
router.get("/current", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: {
          exclude: ["createdAt", "updatedAt", "description"],
        },
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  console.log("REVIEWS", reviews.length);

  for (let review of reviews) {
    const previewImage = await SpotImage.findOne({
      where: {
        spotId: review.Spot.dataValues.id,
        preview: true,
      },
      attributes: ["url"],
    });
    if (previewImage)
      review.Spot.dataValues.previewImage = previewImage.dataValues.url;
  }

  return res.json({ Reviews: reviews });
});

router.put("/:reviewId", async (req, res, next) => {
  const { review, stars } = req.body;
  const id = req.params.reviewId;

  const checkExistingReview = await Review.findOne({
    where: { userId: req.user.dataValues.id, id },
  });
  if (!checkExistingReview) {
    const err = new Error("Review couldn't be found");
    err.message = "Review couldn't be found";
    err.status = 404;
    return next(err);
  }

  await Review.update(
    {
      review,
      stars,
    },
    {
      where: { id },
    }
  );

  const newReview = await Review.findByPk(id);

  return res.json(newReview);
});

// Delete a review
router.delete("/:reviewId", async (req, res, next) => {
  const id = req.params.reviewId;

  const delReview = await Review.findByPk(id);

  if (!delReview || delReview.userId !== req.user.dataValues.id) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    err.message = "Review couldn't be found";
    return next(err);
  }

  await Review.destroy({
    where: {
      id,
    },
  });

  return res.json({ message: "Successfully deleted" });
});

// add image to a review
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const { reviewId } = req.params;
  const { url } = req.body;

  const review = await Review.findByPk(reviewId, {
    include: ReviewImage,
  });

  if (!review || review.userId !== req.user.dataValues.id) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    err.message = "Review couldn't be found";
    return next(err);
  }

  if (review.ReviewImages.length >= 10) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.status = 403;
    err.message = "Maximum number of images for this resource was reached";
    return next(err);
  }

  const reviewImg = await ReviewImage.create({
    url,
    reviewId: parseInt(reviewId),
  });

  return res.json({ url: reviewImg.url, id: reviewImg.id });
});

module.exports = router;
