const jwt = require('jsonwebtoken') ;


const authMiddleware = (req, res, next) => {
  try {
    const response = jwt.verify(req.cookies["token"], process.env.JWT_SECRET);
    req.user = response ;
    next();
  } catch (error) {
    res.status(401).send({
      message: error.message || "Auth Failed.",
    });
  }
}

module.exports = {authMiddleware}