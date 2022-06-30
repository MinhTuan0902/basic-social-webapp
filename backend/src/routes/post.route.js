const router = require("express").Router();
const { PostController } = require("../controllers/post.controller");
const { authenticationMiddleware } = require("../middlewares/authenticate");
const { upload } = require("../config/multer-upload");

router.get("/all-posts", authenticationMiddleware, PostController.getAllPosts);
router.get("/my-posts", authenticationMiddleware, PostController.getMyPosts);
router.get("/:postId", authenticationMiddleware, PostController.getPost);
router.get("/", authenticationMiddleware, PostController.getPostsOfUser);
router.post(
  "/",
  authenticationMiddleware,
  upload.single("image"),
  PostController.createPost
);
router.put("/:postId", authenticationMiddleware, PostController.updatePost);
router.delete("/:postId", authenticationMiddleware, PostController.deletePost);

// REACTION Router
// set reaction
router.post(
  "/:postId/set-reaction",
  authenticationMiddleware,
  PostController.setReaction
);
// remove reaction
router.post(
  "/:postId/remove-reaction",
  authenticationMiddleware,
  PostController.removeReaction
);
router.get(
  "/:postId/reactions",
  authenticationMiddleware,
  PostController.getReactions
);

// COMMENT Router
router.get(
  "/:postId/comments",
  authenticationMiddleware,
  PostController.getComments
);
router.post(
  "/:postId/comments",
  authenticationMiddleware,
  PostController.createComment
);
router.put(
  "/:postId/comments/:commentId",
  authenticationMiddleware,
  PostController.updateComment
);
router.delete(
  "/:postId/comments/:commentId",
  authenticationMiddleware,
  PostController.deleteComment
);

module.exports = router;
