"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 2,
          stars: 3,
          review: "Tbh, mid.",
        },
        {
          spotId: 2,
          userId: 3,
          stars: 4,
          review: "Not the worst, not the best.",
        },
        {
          spotId: 2,
          userId: 3,
          stars: 5,
          review: "Best nuggies anywhere, hands down.",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
