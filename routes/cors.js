const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  console.log("CORS header: " + req.header('Origin'));
  if (whitelist.indexOf(req.header('Origin')) !== -1) {   // -1 means not found, so this checks to ensure it was found
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();    // middleware that responds to all requests
exports.corsWithOptions = cors(corsOptionsDelegate);  // middleware that responds to requests specified above