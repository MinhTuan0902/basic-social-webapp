const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//  MIDDLEWARES
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api/users", require("../routes/user.route"));
app.use("/api/profiles", require("../routes/profile.route"));
app.use("/api/posts", require("../routes/post.route"));
app.use("/api/newsfeed", require("../routes/newsfeed.route"));
app.use("/api/message", require("../routes/message.route"));
app.use("/api/search", require("../routes/search.route"));

module.exports = { app };
