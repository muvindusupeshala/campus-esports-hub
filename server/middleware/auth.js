const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Request Header එකෙන් token එක ලබා ගැනීම
    const token = req.header('Authorization');

    // Token එකක් නැත්නම් access deny කිරීම
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Bearer Token format එකක් නම් 'Bearer ' කෑල්ල අයින් කිරීම
        const tokenString = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

        // Token එක verify කිරීම
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        
        // Request object එකට decoded user data (id & role) එකතු කිරීම
        req.user = decoded;
        next(); // ඊළඟ route handler එකට යැවීම
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};