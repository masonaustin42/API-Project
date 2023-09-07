const express = require("express");

const { requireAuth } = require("../../utils/auth");

const { ReviewImage, Review } = require("../../db/models");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const id = req.params.imageId;

  const delImg = await ReviewImage.findByPk(id, {
    include: {
      model: Review,
      attributes: ["ownerId"],
    },
  });

  if (!delImg || delImg.Review.dataValues.ownerId !== req.user.dataValues.id) {
    const err = new Error("Review Image couldn't be found");
    err.status = 404;
    err.message = "Review Image couldn't be found";
    return next(err);
  }

  await ReviewImage.destroy({
    where: {
      id,
    },
  });

  return res.json({ message: "Successfully deleted" });
});

module.exports = router;
