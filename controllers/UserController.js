const{
  registerUserService,
  loginUserService,
  getUserByIdService,
  resetPasswordService,
} = require("../services/Userservice");

// Controller to handle user registration
const registerUser = async (req, res) => {
  try {
    const newUser = await registerUserService({...req.body},req.file );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Controller to handle user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await loginUserService(email, password);
    res.json(loginUser);
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

// Controller to fetch user details by ID
const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user details' });
  }
};

// Controller to handle password reset
const resetPassword = async (req, res) => {
  try {
    const updatedUser = await resetPasswordService(req.params.id, req.body.newPassword);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error resetting password' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  resetPassword,
};

