const { Review } = require('../models/Review');

module.exports = async (req, res, next) => {
  try {
    const review = await Review.getById(req.params.id);

    if (
      review &&
      (req.user.email === 'admin' || review.user_id === req.user.id)
    ) {
      next();
    } else {
      throw new Error('Access Denied!');
    }
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
