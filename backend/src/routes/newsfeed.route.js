const router = require("express").Router();
const { getMyNewsfeed } = require("../controllers/newsfeed.controller");
const { authenticationMiddleware } = require("../middlewares/authenticate");

router.get("/", authenticationMiddleware, getMyNewsfeed);

module.exports = router;
