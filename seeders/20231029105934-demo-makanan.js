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
      'makanans', 
      [
        {
          nama_makanan: 'Oyako Don',
          harga: 54000,
          deskripsi: 'Japanese rice bowl denga rasa tradisional',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nama_makanan: 'Chicken Teriyaki Don',
          harga: 56000,
          deskripsi: 'Dengan daging ayam yang di panggang',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nama_makanan: 'Niku Mayo Don',
          harga: 54000,
          deskripsi: 'Perpaduan serasi ayam rebus manis dengan mayonaise',
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
    return queryInterface.bulkDelete('makanans', null, {});
  }
};
