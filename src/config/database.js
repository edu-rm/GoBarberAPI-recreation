/* eslint-disable prettier/prettier */
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'toor',
  database: 'barbermanager',
  define : {
    timestamps: true, // updated at and created at
    underscored: true, // utilizando o padrao underscored zzzzzz_zzzz
    underscoredAll: true,
  },
};
