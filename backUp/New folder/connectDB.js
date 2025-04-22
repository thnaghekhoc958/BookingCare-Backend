const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('medical appointment', 'root', null, {
  host: 'localhost',
  dialect:  'mysql',
  logging: false,
});

let ConnectDB = async() => {
  try {
    await sequelize.authenticate();
    // sequelize.query('SELECT * FROM User', (err, results, fields) => {
    //   if (err) {
    //     console.error('Lỗi truy vấn:', err);
    //   } else {
    //     console.log('Kết quả truy vấn:', results);
    //   }
    // });
    console.log('Connection has been established successfully:');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = ConnectDB;