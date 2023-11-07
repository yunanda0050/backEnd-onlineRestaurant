'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      'users', 
      [
        {
          nama: 'Yunanda',
          noTlp: '08945833568',
          email: 'yunanda12345@email.com',
          alamat: 'Kota Tangerang',
          password: '12345678910',
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], 
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
