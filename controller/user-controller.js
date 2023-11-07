
const R = require('ramda');
const { user } = require('../models');
const bcrypt = require("bcrypt");
const {generateToken} = require('../helper/jwt.js')

//POST 

const register = async (req, res) => {
  try {
    const { nama, noTlp, email, alamat, password } = req.body;

    const emailUsed = await user.findOne({ where: { email } });
    if (emailUsed) {
      return res.status(400).json({ error: "Email sudah digunakan" });
    }

    const hashPassword = R.pipe(
      R.partialRight(bcrypt.hashSync, [10]),
      R.assoc('password', R.__, { nama, noTlp, email, alamat, isAdmin: true })
    );

    const newUser = hashPassword(password);

    await user.create(newUser);

    return res.status(201).json({ message: 'akun berhasil dibuat, silahkan login.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Gagal dalam pembuatan akun, silahkan coba lagi' });
  }
};



// LOGIN

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({ where: { email } });

        if (!User) {
            return res.status(400).json({ error: "email atau password tidak terdaftar" });
        }

        const isValid = await bcrypt.compare(password, User.password);

        if (!isValid) {
            return res.status(400).json({ error: "email atau password salah" });
        }

        const payload = R.pick(['id', 'email', 'isAdmin'], User);

        const token = generateToken(payload);

        res.status(200).json({
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error'
        });
    }
}










module.exports = {register, login}

