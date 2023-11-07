'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.pesanan, {
        foreignKey: "userId",
        as: "pesanan1",
      });
    }
  }
  user.init({
    nama: {
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
    noTlp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [10, 13],
          msg: 'Batas digit telepon dari 10 sampai 13 angka saja',
        },
        is: {
        args: /^\d+$/,
        msg: 'Nomor telepon hanya boleh berisi angka.',
        },
        notNull: {
          msg: 'nomor telepon tidak boleh null', // Pesan kesalahan kustom jika null
        },
        notEmpty: {
          msg: 'nomor telepon tidak boleh kosong', // Pesan kesalahan kustom jika string kosong
        },
     },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Alamat email tidak valid',
          },
          notNull: {
            msg: 'Alamat email tidak boleh null',
          },
          notEmpty: {
            msg: 'Alamat email tidak boleh kosong',
          },
        },
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Alamat tidak boleh null',
        },
        notEmpty: {
          msg: 'Alamat tidak boleh kosong',
        },
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        min: 8,
        max:20,
        notNull: {
          msg: 'passward tidak boleh null', // Pesan kesalahan kustom jika null
        },
        notEmpty: {
          msg: 'password tidak boleh kosong', // Pesan kesalahan kustom jika string kosong
        },
     },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};