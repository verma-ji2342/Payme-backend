const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "user not authentic"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;
        console.log(req.userId);
        req.ID = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({
            message: "something went wrong in authentication"
        });
    }
};

module.exports = {
    authMiddleware
}