const jwt = require('jsonwebtoken');
const User = require('../models/User');

// module.exports = function(req, res, next) {
//     const token = req.header('x-auth-token');

//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.user;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

function authMiddleware(req, res, next) {
    //console.log('***********Cookies:', req.cookies); // Debugging line
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}
function adminMiddleware(req, res, next) {
    //console.log('***********Cookies:', req.cookies); // Debugging line
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        if (req.user.role.toLowerCase() !== 'admin') {
            return res.status(403).json({ message: 'Access denied, only admins can perform this action' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}




module.exports = authMiddleware, adminMiddleware;

