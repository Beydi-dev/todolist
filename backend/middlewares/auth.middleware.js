const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({ message: 'Access denied: No token provided' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: 'Invalid or expired token' });

        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;