"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 2,
          startDate: "2023-09-05",
          endDate: "2023-09-07",
        },
        {
          spotId: 1,
          userId: 3,
          startDate: "2023-09-07",
          endDate: "2023-09-09",
        },
        {
          spotId: 2,
          userId: 3,
          startDate: "2024-01-01",
          endDate: "2024-02-01",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [1, 2, 3],
      },
    });
  },
};
