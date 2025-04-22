const { Sequelize } = require('sequelize');
// const { sequelize } = require('../models'); // Import sequelize từ models

// const fs = require('fs');

// const sequelizeErd = require('sequelize-erd');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('medical appointment', 'root', null, {
  host: 'localhost',
  dialect:  'mysql',
  logging: false,
});

const ConnectDB = async () => {
  try {
      // Kiểm tra kết nối cơ sở dữ liệu
      await sequelize.authenticate();
      console.log('Kết nối cơ sở dữ liệu thành công!');

      // // Tạo sơ đồ ERD
      // const svg = await sequelizeErd({ source: sequelize });
      // fs.writeFileSync('./erd.svg', svg);
      // console.log('ERD được tạo thành công tại file erd.svg');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
};


// const { sequelize } = require('./models'); // Đường dẫn tới models của bạn



module.exports = ConnectDB;