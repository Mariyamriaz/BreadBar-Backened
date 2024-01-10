const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/UserController');


var storage = multer.diskStorage({
    destination: function (req, file, callBack) {
      callBack(null, "uploads/");
    },
  
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  });
  
  const upload = multer({ storage: storage });
  
// Register a new user
router.post('/register',upload.single('avatar'), userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Fetch user details by ID
router.get('/user/:id', userController.getUserById);

// Reset password
router.put('/resetPassword/:id', userController.resetPassword);

module.exports = router;
