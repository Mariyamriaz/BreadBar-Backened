const{
    addProduct,
  deleteProduct,
  getProducts,
  editProduct,
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
  addRatingAndReview,
  getProductRatingAndReviews,
  applyDiscount,
  } = require("../services/Productservice");

  // Controller to handle adding a product
const addProductController = async (req, res) => {
    try {
      const newProduct = await addProduct(req.body);
      res.json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to handle deleting a product
  const deleteProductController = async (req, res) => {
    try {
      const deletedProduct = await deleteProduct(req.params.productId);
      res.json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to handle getting all products
  const getProductsController = async (req, res) => {
    try {
      const allProducts = await getProducts();
      res.json(allProducts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to handle editing/updating a product
  const editProductController = async (req, res) => {
    try {
      const updatedProduct = await editProduct(req.params.productId, req.body);
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to handle adding a product to a user's wishlist
  const addToWishlistController = async (req, res) => {
    try {
      const wishlist = await addToWishlist(req.params.userId, req.params.productId);
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to handle removing a product from a user's wishlist
  const removeFromWishlistController = async (req, res) => {
    try {
      const wishlist = await removeFromWishlist(req.params.userId, req.params.productId);
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to handle retrieving a user's wishlist
  const getUserWishlistController = async (req, res) => {
    try {
      const wishlist = await getUserWishlist(req.params.userId);
      res.json(wishlist);}
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to handle adding a rating and review to a product
  const addRatingAndReviewController = async (req, res) => {
    try {
      const newRating = await addRatingAndReview(
        req.params.productId,
        req.params.userId,
        req.body.rating,
        req.body.review
      );
      res.json(newRating);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to handle retrieving average rating and all reviews for a product
  const getProductRatingAndReviewsController = async (req, res) => {
    try {
      const ratingAndReviews = await getProductRatingAndReviews(req.params.productId);
      res.json(ratingAndReviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Controller to handle applying discounts to products
  const applyDiscountController = async (req, res) => {
    try {
      const productWithDiscount = await applyDiscount(
        req.params.productId,
        req.body.discountPercentage
      );
      res.json(productWithDiscount);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
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
  };