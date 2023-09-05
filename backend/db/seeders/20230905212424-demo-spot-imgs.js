"use strict";

const { SpotImage } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "picture1.url",
        },
        {
          spotId: 2,
          url: "picture2.url",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [1, 2, 3],
      },
    });
  },
};
