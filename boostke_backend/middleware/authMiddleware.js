const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    // If no token, try to get from cookies
    if (!token) {
        const cookieToken = req.cookies?.token;
        if (!cookieToken) {
            return res.status(401).json({
                success: false,
                message: 'Access token required'
            });
        }
    }

    const tokenToVerify = token || req.cookies.token;

    jwt.verify(tokenToVerify, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
        
        req.user = user;
        next();
    });
};

// Optional authentication - doesn't fail if no token
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        const cookieToken = req.cookies?.token;
        if (!cookieToken) {
            req.user = null;
            return next();
        }
    }

    const tokenToVerify = token || req.cookies.token;

    jwt.verify(tokenToVerify, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            req.user = null;
        } else {
            req.user = user;
        }
        next();
    });
};

module.exports = {
    authenticateToken,
    optionalAuth
};
