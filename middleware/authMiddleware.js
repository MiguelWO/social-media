const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.body.headers.Authorization;
        const token = authHeader && authHeader.split(' ')[1];
        // console.log(req.body.headers.Authorization);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized 1' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized 2' });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = auth;