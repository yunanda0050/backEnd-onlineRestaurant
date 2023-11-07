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
      'minumans', 
      [
        {
          nama_minuman: 'Hot Matcha Latte',
          harga: 49000,
          deskripsi: 'Teh hijau matcha panas',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nama_minuman: 'Ice Matcha Latte',
          harga: 49000,
          deskripsi: 'Teh hijau matcha dingin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nama_minuman: 'Hiyashiame',
          harga: 49000,
          deskripsi: 'Minuman jahe manis khas Jepang',
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
    return queryInterface.bulkDelete('minumans', null, {});
  }
};
