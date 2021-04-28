const express = require('express');
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');
const cors = require('./cors'); // note that this is importing the routes/cors.js file, not the cors package

const promotionsRouter = express.Router();
promotionsRouter.use(express.json()); // parses json data into JS properties so we can use it

promotionsRouter.route('/')   // chaining all verbs to this router below
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200) )
.get(cors.cors, (req, res, next) => {
  Promotion.find()
  .then(promotion => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
  })
  .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Promotion.create(req.body)
  .then(promotion => {
    console.log('Promotion Created: ', promotion);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
  })
  .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /promotions');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  console.log('Deleting all promotions');
  Promotion.deleteMany()
    .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
    })
    .catch(err => next(err));
});


promotionsRouter.route('/:promotionId')  // chaining all verbs to this router below
.get(cors.cors, (req, res, next) => {
  Promotion.findById(req.params.promotionId)
  .then(promotion => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
  })
  .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /promotions/${req.params.promotionId}`)
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  console.log(`Updating the promotion: ${req.params.promotionId}.\n`);
  Promotion.findByIdAndUpdate(req.params.promotionId, {
    $set: req.body
  }, { new: true })
    .then(promotion => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotion);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Promotion.findByIdAndDelete(req.params.promotionId)
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});

module.exports = promotionsRouter;