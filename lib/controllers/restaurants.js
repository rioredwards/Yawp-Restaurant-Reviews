const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const { Restaurant } = require('../models/Restaurant');
const { Review } = require('../models/Review.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.id);
      await restaurant.addReviews();
      res.json(restaurant);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id/reviews', authenticate, async (req, res, next) => {
    try {
      // create a new review
      const review = await Review.insert({
        userId: req.user.id,
        restaurantId: req.params.id,
        stars: req.body.stars,
        detail: req.body.detail,
      });
      // return the review in the response
      res.json(review);
    } catch (e) {
      next(e);
    }
  });
