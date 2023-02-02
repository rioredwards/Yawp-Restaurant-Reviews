const pool = require('../utils/pool');
const { Review } = require('./Review');

class Restaurant {
  id;
  name;
  cuisine;
  cost;
  image;
  website;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cuisine = row.cuisine;
    this.cost = row.cost;
    this.image = row.image;
    this.website = row.website;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from restaurants;');
    return rows.map((row) => new Restaurant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * from restaurants WHERE id = $1;',
      [id]
    );
    if (!rows) return null;
    return new Restaurant(rows[0]);
  }

  async addReviews() {
    const { rows } = await pool.query(
      'SELECT * from reviews where restaurant_id = $1',
      [this.id]
    );
    this.reviews = rows.map((row) => new Review(row));
  }
}

module.exports = { Restaurant };
