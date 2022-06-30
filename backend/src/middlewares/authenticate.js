const jwt = require("jsonwebtoken");

const messageError =
  "Token is not provided. You are not allowed to do this action";

const authenticationMiddleware = (req, res, next) => {
  const authHeader =
    req.header("x-access-token") || req.header("Authorization");
  if (!authHeader) {
    return res.status(403).json({ mesasge: messageError });
  }

  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(403).json({ mesasge: messageError });
  }

  try {
    const decode = jwt.decode(accessToken);
    req.userId = decode.userId;
  } catch (error) {
    return res.status(403).json({ message: messageError });
  }

  next();
};

module.exports = { authenticationMiddleware };
