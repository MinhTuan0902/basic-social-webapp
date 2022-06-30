const router = require("express").Router();
const { authenticationMiddleware } = require("../middlewares/authenticate");
const { Profile } = require("../models/profile.model");

router.get("/", authenticationMiddleware, async (req, res) => {
  const name = req.query.name;

  try {
    if (name) {
      const searchNameArray = name.split("-");
      const regex = searchNameArray.join("|");
      const profilesFound = await Profile.find({
        name: { $regex: regex, $options: "i" },
      });
      res.status(200).json({ searchName: searchNameArray, profilesFound });
    } else {
      res.status(400).json({ message: "Name to search not ound" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
