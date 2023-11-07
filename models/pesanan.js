'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pesanan.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user1",
      });
      pesanan.belongsTo(models.makanan, {
        foreignKey: "makananId",
        as: "Makanan yang dipesan :",
      });
      pesanan.belongsTo(models.minuman, {
        foreignKey: "minumanId",
        as: "Minuman yang dipesan :",
      });
    }
  }
  pesanan.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Kolom tidak boleh null
    },
    makananId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Kolom tidak boleh null
    },
    jumlah_makanan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minumanId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Kolom tidak boleh null
    },
    jumlah_minuman: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalHarga: {
      type: DataTypes.FLOAT,
      allowNull: false, // Kolom tidak boleh null
    },
  }, {
    sequelize,
    modelName: 'pesanan',
  });
  return pesanan;
};