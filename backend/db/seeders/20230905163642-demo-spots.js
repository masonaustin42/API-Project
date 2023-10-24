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
          name: "Swamp House",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed. Donec adipiscing tristique risus nec feugiat in fermentum. Congue eu consequat ac felis donec et odio. Libero justo laoreet sit amet cursus sit amet. Massa massa ultricies mi quis hendrerit dolor. Facilisi nullam vehicula ipsum a arcu cursus. Faucibus in ornare quam viverra orci. Maecenas volutpat blandit aliquam etiam. Tincidunt id aliquet risus feugiat in ante. Enim diam vulputate ut pharetra sit amet aliquam. Consequat id porta nibh venenatis cras sed felis eget velit. Aliquam vestibulum morbi blandit cursus risus. Nisi est sit amet facilisis magna etiam tempor orci. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Leo urna molestie at elementum eu facilisis sed odio. Odio eu feugiat pretium nibh. Viverra accumsan in nisl nisi scelerisque eu. Dictumst vestibulum rhoncus est pellentesque. Ac turpis egestas sed tempus urna et pharetra. Condimentum lacinia quis vel eros donec ac odio tempor. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Sapien nec sagittis aliquam malesuada bibendum arcu. Eros in cursus turpis massa tincidunt. Auctor elit sed vulputate mi sit amet mauris commodo. Et ligula ullamcorper malesuada proin. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Mattis enim ut tellus elementum. Augue lacus viverra vitae congue eu consequat ac. Tincidunt tortor aliquam nulla facilisi cras fermentum. Quis vel eros donec ac odio tempor orci dapibus. Eget mauris pharetra et ultrices neque ornare aenean.",
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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed. Donec adipiscing tristique risus nec feugiat in fermentum. Congue eu consequat ac felis donec et odio. Libero justo laoreet sit amet cursus sit amet. Massa massa ultricies mi quis hendrerit dolor. Facilisi nullam vehicula ipsum a arcu cursus. Faucibus in ornare quam viverra orci. Maecenas volutpat blandit aliquam etiam. Tincidunt id aliquet risus feugiat in ante. Enim diam vulputate ut pharetra sit amet aliquam. Consequat id porta nibh venenatis cras sed felis eget velit. Aliquam vestibulum morbi blandit cursus risus. Nisi est sit amet facilisis magna etiam tempor orci. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Leo urna molestie at elementum eu facilisis sed odio. Odio eu feugiat pretium nibh. Viverra accumsan in nisl nisi scelerisque eu. Dictumst vestibulum rhoncus est pellentesque. Ac turpis egestas sed tempus urna et pharetra. Condimentum lacinia quis vel eros donec ac odio tempor. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Sapien nec sagittis aliquam malesuada bibendum arcu. Eros in cursus turpis massa tincidunt. Auctor elit sed vulputate mi sit amet mauris commodo. Et ligula ullamcorper malesuada proin. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Mattis enim ut tellus elementum. Augue lacus viverra vitae congue eu consequat ac. Tincidunt tortor aliquam nulla facilisi cras fermentum. Quis vel eros donec ac odio tempor orci dapibus. Eget mauris pharetra et ultrices neque ornare aenean.",
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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed. Donec adipiscing tristique risus nec feugiat in fermentum. Congue eu consequat ac felis donec et odio. Libero justo laoreet sit amet cursus sit amet. Massa massa ultricies mi quis hendrerit dolor. Facilisi nullam vehicula ipsum a arcu cursus. Faucibus in ornare quam viverra orci. Maecenas volutpat blandit aliquam etiam. Tincidunt id aliquet risus feugiat in ante. Enim diam vulputate ut pharetra sit amet aliquam. Consequat id porta nibh venenatis cras sed felis eget velit. Aliquam vestibulum morbi blandit cursus risus. Nisi est sit amet facilisis magna etiam tempor orci. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Leo urna molestie at elementum eu facilisis sed odio. Odio eu feugiat pretium nibh. Viverra accumsan in nisl nisi scelerisque eu. Dictumst vestibulum rhoncus est pellentesque. Ac turpis egestas sed tempus urna et pharetra. Condimentum lacinia quis vel eros donec ac odio tempor. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Sapien nec sagittis aliquam malesuada bibendum arcu. Eros in cursus turpis massa tincidunt. Auctor elit sed vulputate mi sit amet mauris commodo. Et ligula ullamcorper malesuada proin. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Mattis enim ut tellus elementum. Augue lacus viverra vitae congue eu consequat ac. Tincidunt tortor aliquam nulla facilisi cras fermentum. Quis vel eros donec ac odio tempor orci dapibus. Eget mauris pharetra et ultrices neque ornare aenean.",
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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed. Donec adipiscing tristique risus nec feugiat in fermentum. Congue eu consequat ac felis donec et odio. Libero justo laoreet sit amet cursus sit amet. Massa massa ultricies mi quis hendrerit dolor. Facilisi nullam vehicula ipsum a arcu cursus. Faucibus in ornare quam viverra orci. Maecenas volutpat blandit aliquam etiam. Tincidunt id aliquet risus feugiat in ante. Enim diam vulputate ut pharetra sit amet aliquam. Consequat id porta nibh venenatis cras sed felis eget velit. Aliquam vestibulum morbi blandit cursus risus. Nisi est sit amet facilisis magna etiam tempor orci. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Leo urna molestie at elementum eu facilisis sed odio. Odio eu feugiat pretium nibh. Viverra accumsan in nisl nisi scelerisque eu. Dictumst vestibulum rhoncus est pellentesque. Ac turpis egestas sed tempus urna et pharetra. Condimentum lacinia quis vel eros donec ac odio tempor. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Sapien nec sagittis aliquam malesuada bibendum arcu. Eros in cursus turpis massa tincidunt. Auctor elit sed vulputate mi sit amet mauris commodo. Et ligula ullamcorper malesuada proin. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Mattis enim ut tellus elementum. Augue lacus viverra vitae congue eu consequat ac. Tincidunt tortor aliquam nulla facilisi cras fermentum. Quis vel eros donec ac odio tempor orci dapibus. Eget mauris pharetra et ultrices neque ornare aenean.",
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
