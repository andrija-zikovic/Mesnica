const allowedOrigins = require('../config/allowedOrgins');
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    console.log('credentials origin:', origin);
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Credentials', true);
        console.log('credentials origin is allowed');
    }
    next();
}

module.exports = credentials;