module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('User', [
        {
        name: 'admin',
        email: 'dongn0808@gmail.com',
        phonenumber: '0395004026',
        address: 'abcxyz, phuong phu tan',
        password : 'admin',
        gender : '0',
        roleId : 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        },
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('User', null, {});
    },
  };