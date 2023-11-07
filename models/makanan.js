'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class makanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      makanan.hasMany(models.pesanan, {
        foreignKey: "makananId",
        as: "pesanan3", 
      });
    }
  }
  makanan.init({
    nama_makanan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nama Makanan tidak boleh null',
        },
        notEmpty: {
          msg: 'Nama Makanan tidak boleh kosong',
        },
        len: {
          args: [1, 255],
          msg: 'Panjang string harus antara 1 hingga 255 karakter',
        },
      },
    },
    harga: {
      type: DataTypes.FLOAT,
      allowNull: false, // Kolom tidak boleh null
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false, // Kolom tidak boleh null
      validate: {
          notNull: {
            msg: 'Deskripsi tidak boleh null', // Pesan kesalahan kustom jika null
          },
          notEmpty: {
            msg: 'Deskripsi tidak boleh kosong', // Pesan kesalahan kustom jika string kosong
          },
      },
    },
  }, {
    sequelize,
    modelName: 'makanan',
  });
  return makanan;
};