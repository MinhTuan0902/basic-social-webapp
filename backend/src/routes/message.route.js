const router = require("express").Router();
const { MessageController } = require("../controllers/message.controller");
const { authenticationMiddleware } = require("../middlewares/authenticate");

router.post("/", authenticationMiddleware, MessageController.createMessage);
router.get("/", authenticationMiddleware, MessageController.getAllMessages);

module.exports = router;
