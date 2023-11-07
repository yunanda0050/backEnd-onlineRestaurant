const { pesanan, user} = require('../models');

const isUserOwnPesananAuth = async (req, res, next) => {
    try {
        const Pesanan = await pesanan.findOne({ where: {id: req.params.id}});
        const User = req.authUser;
        if(!Pesanan) {
            return res.status(404).json({ message: "pesanan tidak ditemukan" });
        }
        if (Pesanan.userId !== User?.id) {
            return res.status(404).json({ message: "Anda tidak punya akses data ini" });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Error dalam isUserOwnPesananAuth'
        });
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const { isAdmin } = req.authUser;
        if (!isAdmin) {
            return res.status(404).json({ message: "akses hanya untuk user admin" });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Error dalam isAdmin'
        });
    }
};

module.exports = { isUserOwnPesananAuth,  isAdmin };