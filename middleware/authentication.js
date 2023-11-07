const { verifyToken } = require('../helper/jwt');
const {user} = require('../models');
const authUser = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.slice(7);

        if (!token) {
            return res.status(401).json({ message: "user tidak terauthentikasi" });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "user tidak terauthentikasi" });
        }

        const User = await user.findOne({ where: {email: decoded?.email}});
        if (!User) {
            return res.status(401).json({ message: "user tidak terauthentikasi" });
        }

        req.authUser = User;

        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Error pada authentication'
        });
    }
}

module.exports = { authUser }