const Product = require('../models/Productmodel');
const User = require('../models/Usermodel'); 

// Service to add a product
// const addProduct = async (productData) => {
//   try {
//     const newProduct = new Product({name:productData.name, price:productData.price,description:productData.description,category:productData.category,availability:productData.availability,imageUrl:productData.imageUrl,discounts:productData.discounts,wishlist:productData.wishlist,ratings:productData.ratings});
//     await newProduct.save();
//     console.log("save");
//     return newProduct;
//   } catch (error) {
//     throw new Error('Error adding product');
//   }
// };
const addProduct = async (productData) => {
  try {
    const newProduct = new Product({
      name: productData.name,
      price: productData.price,
      description: productData.description,
      category: productData.category,
      availability: productData.availability,
      imageUrl: productData.imageUrl,
      discounts: productData.discounts,
      wishlist: productData.wishlist
      // ratings: productData.ratings,
    });

    await newProduct.save();
    console.log("Product saved successfully");
    return newProduct; 
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error('Error adding product');
  }
};


// Service to delete a product
const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (error) {
    throw new Error('Error deleting product');
  }
};

// Service to get all products
const getProducts = async () => {
  try {
    const allProducts = await Product.find();
    return allProducts;
  } catch (error) {
    throw new Error('Error getting products');
  }
};

// Service to edit/update a product
const editProduct = async (productId, updatedData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
    return updatedProduct;
  } catch (error) {
    throw new Error('Error editing product');
  }
};

// Service to add a product to a user's wishlist
const addToWishlist = async (userId, productId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (user.wishlist.includes(productId)) {
      throw new Error('Product is already in the wishlist');
    }

    user.wishlist.push(productId);
    await user.save();

    return user.wishlist;
  } catch (error) {
    throw new Error(`Error adding product to wishlist: ${error.message}`);
  }
};

// Service to remove a product from a user's wishlist
const removeFromWishlist = async (userId, productId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const productIndex = user.wishlist.indexOf(productId);
    if (productIndex === -1) {
      throw new Error('Product is not in the wishlist');
    }

    user.wishlist.splice(productIndex, 1);
    await user.save();

    return user.wishlist;
  } catch (error) {
    throw new Error(`Error removing product from wishlist: ${error.message}`);
  }
};

// Service to retrieve a user's wishlist
const getUserWishlist = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const wishlist = await Product.find({ _id: { $in: user.wishlist } });

    return wishlist;
  } catch (error) {
    throw new Error(`Error retrieving user wishlist: ${error.message}`);
  }
};

// Service to add a rating and review to a product
const addRatingAndReview = async (productId, userId, rating, review) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newRating = { user: userId, rating };
    product.ratings.push(newRating);
    product.save();

    // You might want to handle the review separately depending on your model structure

    return newRating;
  } catch (error) {
    throw new Error(`Error adding rating and review: ${error.message}`);
  }
};

// Service to retrieve average rating and all reviews for a product
const getProductRatingAndReviews = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const totalRatings = product.ratings.length;
    const averageRating = totalRatings > 0
      ? product.ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings
      : 0;

    return {
      averageRating,
      ratings: product.ratings,
    };
  } catch (error) {
    throw new Error(`Error retrieving product rating and reviews: ${error.message}`);
  }
};

// Service to apply discounts to products
const applyDiscount = async (productId, discountPercentage) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    product.discounts = discountPercentage;
    await product.save();

    return product;
  } catch (error) {
    throw new Error(`Error applying discount: ${error.message}`);
  }
};

module.exports = {
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
};
