"use strict";

const { Spot } = require("../models");
const { faker } = require("@faker-js/faker");

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
          name: "Swamp House",
          description: faker.lorem.lines(5),
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
          name: "Wizard Tower",
          description: faker.lorem.lines(5),
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
          name: "Vlad's Castle",
          description: faker.lorem.lines(5),
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
          name: "Bag End",
          description: faker.lorem.lines(5),
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
          [Op.in]: ["Swamp House", "Wizard Tower", "Vlad's Castle", "Bag End"],
        },
      },
      {}
    );
  },
};
