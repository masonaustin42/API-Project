"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/house-outside.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/house-inside-1.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/house-inside-2.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/house-inside-3.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/house-inside-4.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/wizard-tower-outside.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/wizard-tower-inside-1.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/wizard-tower-inside-2.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/wizard-tower-inside-3.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/wizard-tower-inside-4.png",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/spooky-castle-outside.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/spooky-castle-inside.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/spooky-castle-inside-2.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/spooky-castle-inside-3.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/spooky-castle-inside-4.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/hobbit-hole-outside.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/hobbit-hole-inside-1.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/hobbit-hole-inside-2.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/hobbit-hole-inside-3.png",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://ma-aa-airbnb.s3.us-west-2.amazonaws.com/hobbit-hole-inside-4.png",
          preview: false,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: {
          [Op.in]: [1, 2, 3, 4],
        },
      },
      {}
    );
  },
};
