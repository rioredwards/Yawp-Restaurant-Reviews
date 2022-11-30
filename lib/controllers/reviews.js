const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const userDelete = require('../middleware/user-delete.js');
const { Review } = require('../models/Review.js');

module.exports = Router().delete(
  '/:id',
  [authenticate, userDelete],
  async (req, res, next) => {
    try {
      const data = await Review.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
);
