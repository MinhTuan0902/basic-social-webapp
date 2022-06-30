const router = require("express").Router();
const { upload } = require("../config/multer-upload");
const { ProfileController } = require("../controllers/profile.controller");
const { authenticationMiddleware } = require("../middlewares/authenticate");

router.put("/", authenticationMiddleware, ProfileController.update);
router.get("/me", authenticationMiddleware, ProfileController.getMyProfile);
router.get("/", authenticationMiddleware, ProfileController.getUserProfile);
router.get(
  "/all-profiles",
  authenticationMiddleware,
  ProfileController.getAllProfiles
);
router.put(
  "/update-avatar",
  authenticationMiddleware,
  upload.single("image"),
  ProfileController.updateAvatar
);
router.get("/avatar", authenticationMiddleware, ProfileController.getAvatar);

module.exports = router;
