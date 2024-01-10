const express = require("express");
const router = express.Router();
const {
  GetTodo,
  createTodo,
  login,
} = require("../controllers/Todo.controller");
const CustomMiddleware = require("../middleware/customMiddleware");
const notifyEmail = require("../mail/notifyEmail");

router.get("/", CustomMiddleware, GetTodo);
router.post("/", createTodo);
router.post("/login", login);
router.all("/send", async (req, res) => {

    const sent = await notifyEmail({
      email: req.body.email,
      subject: "This is testing email",
    });

  if (sent)
    res.json({
      success: true,
      message: "Email sent",
    });
  else
    res.status(400).json({
      success: false,
      message: "Email not sent",
    });
});

module.exports = router;
