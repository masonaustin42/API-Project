const express = require("express");

const { requireAuth } = require("../../utils/auth");

const { SpotImage, Spot } = require("../../db/models");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const id = req.params.imageId;

  const delImg = await SpotImage.findByPk(id, {
    include: {
      model: Spot,
      attributes: ["ownerId"],
    },
  });

  if (!delImg || delImg.Spot.dataValues.ownerId !== req.user.dataValues.id) {
    const err = new Error("Spot Image couldn't be found");
    err.status = 404;
    err.message = "Spot Image couldn't be found";
    return next(err);
  }

  await SpotImage.destroy({
    where: {
      id,
    },
  });

  return res.json({ message: "Successfully deleted" });
});

module.exports = router;
