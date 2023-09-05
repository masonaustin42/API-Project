"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "4225 SE Mile Hill Dr",
          city: "Port Orchard",
          state: "Washington",
          country: "USA",
          lat: 47.534333729183,
          lng: -122.59627595866229,
          name: "McDonald's",
          description:
            "This is a McDonald's restaurant. Come spend a night or two!",
          price: 123.45,
        },
        {
          ownerId: 1,
          address: "6602 19th St W",
          city: "Fircrest",
          state: "Washington",
          country: "USA",
          lat: 47.242572756428935,
          lng: -122.5250235429405,
          name: "Chick-fil-A",
          description:
            "This is a Chick-fil-A restaurant. The cows make great company!",
          price: 234.56,
        },
        {
          ownerId: 2,
          address: "3458 SE Mile Hill Dr",
          city: "Port Orchard",
          state: "Washington",
          country: "USA",
          lat: 47.53356833150984,
          lng: -122.60760423504283,
          name: "Taco Bell",
          description:
            "This is a Taco Bell restaurant. Authentic Mexican cuisine!",
          price: 100.0,
        },
        {
          ownerId: 3,
          address: "3487 Bethel Rd SE",
          city: "Port Orchard",
          state: "Washington",
          country: "USA",
          lat: 47.51685571815222,
          lng: -122.63062494928074,
          name: "Wendy's",
          description:
            "This is a Wendy's restaurant. Come spend get a Four for Four!",
          price: 444.44,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: ["McDonald's", "Chick-fil-A", "Taco Bell", "Wendy's"],
        },
      },
      {}
    );
  },
};
