const jwt = require("jsonwebtoken");

const verfityToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (error, user) => {
      if (error) {
        res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Your not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verfityToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Your are not allowed to do that!");
    }
  });
};

//ADMIN
const verifyTokenAndAdmin = (req, res, next) => {
  verfityToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Your are not allowed to do that!");
    }
  });
};

module.exports = {
  verfityToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
