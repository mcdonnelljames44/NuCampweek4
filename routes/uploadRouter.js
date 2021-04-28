const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors'); // note that this is importing the routes/cors.js file, not the cors package

const storage = multer.diskStorage({
  destination: (req, file, callbk) => {
    callbk(null, 'public/images');
  },
  filename: (req, file, callbk) => {
    callbk(null, file.originalname) // do this so that multer won't give the file a random name
  }
});

const imageFileFilter = (req, file, callbk) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callbk(new Error('You can upload only image files!'), false);  // false = reject the file
  }
  callbk(null, true)  // true = accept the file
};

const upload = multer({storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200) )
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.statusCode = 403;
  res.end('GET operation not supported on /imageUpload');
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  console.log(req.file);
  res.json(req.file);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /imageUpload');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;