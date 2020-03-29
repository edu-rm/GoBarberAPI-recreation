/* eslint-disable prettier/prettier */
require("dotenv").config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define : {
    timestamps: true, // updated at and created at
    underscored: true, // utilizando o padrao underscored zzzzzz_zzzz
    underscoredAll: true,
  },
};
