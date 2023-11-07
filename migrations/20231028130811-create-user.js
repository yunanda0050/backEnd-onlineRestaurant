'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
          },
        },
      },
      noTlp: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: {
          args: /^\d+$/,
          msg: 'Nomor telepon hanya boleh berisi angka.',
          },
          len: {
            args: [10, 13],
          },
        },
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Alamat email tidak valid',
          },
        },
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};