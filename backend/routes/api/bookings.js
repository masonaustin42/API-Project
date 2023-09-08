const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { User, Spot, Booking, SpotImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// get bookings of current user
router.get("/current", requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.dataValues.id,
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ["createdAt", "updatedAt", "description"],
      },
    },
  });

  for (let spot of bookings) {
    const previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.Spot.dataValues.id,
        preview: true,
      },
      attributes: ["url"],
    });
    if (previewImage)
      spot.Spot.dataValues.previewImage = previewImage.dataValues.url;
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

// edit a booking
router.put(
  "/:bookingId",
  requireAuth,
  validateBooking,
  async (req, res, next) => {
    const id = req.params.bookingId;

    const { startDate, endDate } = req.body;

    const reqBooking = await Booking.findByPk(id);

    if (
      !reqBooking ||
      reqBooking.dataValues.userId !== req.user.dataValues.id
    ) {
      const err = new Error("Booking couldn't be found");
      err.status = 404;
      err.message = "Booking couldn't be found";
      return next(err);
    }

    const start = new Date(reqBooking.dataValues.startDate);
    const end = new Date(reqBooking.dataValues.endDate);

    if (start.getTime() < Date.now() || end.getTime() < Date.now()) {
      const err = new Error("Past bookings can't be modified");
      err.status = 403;
      err.message = "Past bookings can't be modified";
      return next(err);
    }

    const spot = await Spot.findByPk(reqBooking.dataValues.spotId, {
      include: Booking,
    });

    for (const booking of spot.Bookings) {
      let errors = {};
      let bookingStart = new Date(booking.dataValues.startDate);
      let bookingEnd = new Date(booking.dataValues.endDate);
      let start = new Date(startDate);
      let end = new Date(endDate);
      if (booking.dataValues.id != id) {
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
    }

    await Booking.update(
      {
        startDate,
        endDate,
      },
      {
        where: {
          id,
          userId: req.user.dataValues.id,
        },
      }
    );

    const updatedBooking = await Booking.findByPk(id);
    res.json(updatedBooking);
  }
);

// delete booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const id = req.params.bookingId;

  const delBooking = await Booking.findByPk(id, { include: Spot });

  if (
    !delBooking ||
    (delBooking.dataValues.userId !== req.user.dataValues.id &&
      delBooking.Spot.dataValues.ownerId !== req.user.dataValues.id)
  ) {
    const err = new Error("Booking can't be found");
    err.status = 404;
    err.message = "Booking can't be found";
    return next(err);
  }

  const startBooking = new Date(delBooking.dataValues.startDate);
  if (startBooking.getTime() <= Date.now()) {
    const err = new Error("Bookings that have been started can't be deleted");
    err.status = 403;
    err.message = "Bookings that have been started can't be deleted";
    return next(err);
  }

  delBooking.destroy();

  res.json({ message: "Successfully deleted" });
});
module.exports = router;
