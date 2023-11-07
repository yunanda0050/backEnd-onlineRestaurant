'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pesanans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      makananId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "makanans",
          },
          key: "id",
        },
      },
      jumlah_makanan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      minumanId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "minumans",
          },
          key: "id",
        },
      },
      jumlah_minuman: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalHarga: {
        allowNull: false,
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('pesanans');
  }
};