const router = require("express").Router();
const { UserController } = require("../controllers/user.controller");
const { authenticationMiddleware } = require("../middlewares/authenticate");

// AUTH
router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/", UserController.getAllUsers);

// FOLLOW
router.post(
  "/:userId/follow",
  authenticationMiddleware,
  UserController.followUser
);
router.post(
  "/:userId/unfollow",
  authenticationMiddleware,
  UserController.unfollowUser
);
router.get(
  "/:userId/get-follow",
  authenticationMiddleware,
  UserController.getFollowOfUser
);

module.exports = router;
