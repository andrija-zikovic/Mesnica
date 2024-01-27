const allowedOrgins = require("./allowedOrgins");
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrgins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
      console.log("origin is allowed");
    } else {
      callback(new Error("Not allowed by CORS"));
      console.log("origin is not allowed");
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
