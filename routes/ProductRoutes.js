const express = require('express');
const router = express.Router();
const {
  addProductController,
  deleteProductController,
  getProductsController,
  editProductController,
  addToWishlistController,
  removeFromWishlistController,
  getUserWishlistController,
  addRatingAndReviewController,
  getProductRatingAndReviewsController,
  applyDiscountController,
} = require('../controllers/ProductControllers'); // Adjust the path as needed

// Route to add a product
router.post('/products', addProductController);

// Route to delete a product
router.delete('/products/:productId', deleteProductController);

// Route to get all products
router.get('/products', getProductsController);

// Route to edit/update a product
router.put('/products/:productId', editProductController);

// Route to add a product to a user's wishlist
router.post('/wishlist/:userId/:productId', addToWishlistController);

// Route to remove a product from a user's wishlist
router.delete('/wishlist/:userId/:productId', removeFromWishlistController);

// Route to get a user's wishlist
router.get('/wishlist/:userId', getUserWishlistController);

// Route to add a rating and review to a product
router.post('/products/:productId/rating/:userId', addRatingAndReviewController);

// Route to get average rating and reviews for a product
router.get('/products/:productId/rating', getProductRatingAndReviewsController);

// Route to apply discounts to products
router.post('/products/:productId/discount', applyDiscountController);

module.exports = router;
