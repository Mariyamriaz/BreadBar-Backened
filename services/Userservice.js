const User = require('../models/Usermodel');
const bcrypt = require('bcrypt');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dkkqbtghy",
  api_key: "135595973584615",
  api_secret: "YVs3l8n75xhEdwasCBdIk3msEYk",
  secure: true,
});

// Service to register a new user
const registerUserService = async (username, file) => {
  try {
    const hashedPassword = await bcrypt.hash(username.password, 10);
    const {secure_url}  = await cloudinary.uploader.upload(file.path);
    const  newUser = new User ({ username:username.username, email:username.email, password:hashedPassword,file:secure_url });
    // console.log('Before saving user to DB');
await newUser.save();
console.log('After saving user to DB');
    // await newUser.save();
    return newUser;
  } catch (error) {
    // console.error('Error registering user:', error);
    throw new Error('Error registering user');
  }
};


// Service to authenticate a user
const loginUserService = async (email, password) => {

const user = await User.findOne({ email });
if(user){
console.log(user);
return {user};
}
else return {success: false, message: "User not Found", status: 404 };


  // if (user) {
  //   const matched = await user.comparePassword(password);
  //   console.log(user.password); // hash
  //   if (matched) {
  //     return {user};
  //   }
  //   return {
  //     success: false,
  //     message: "User Found but password is incorrect",
  //     status: 400,
  //   };
  // } else return { success: false, message: "User not Found", status: 404 };

};

// Service to fetch user details by ID
const getUserByIdService = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error('Error fetching user details');
  }
};

// Service to handle password reset
const resetPasswordService = async (userId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error('Error resetting password');
  }
};

module.exports = {
  registerUserService,
  loginUserService,
  getUserByIdService,
  resetPasswordService,
};
