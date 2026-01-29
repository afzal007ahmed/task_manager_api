const jwt = require('jsonwebtoken');
const {config} = require('../config');


const authMiddleware = (req, res, next) => {
  try {
    if ( !req.headers.token || !req.headers.token.length ) {
      throw new Error('Please provide token.');
    }
    if ( req.headers.token?.split(' ')[0] !== 'Bearer' ) {
      throw new Error('Add Bearer.');
    }
    const token = jwt.verify(req.headers.token?.split(' ')[1], config.jwt.secret);
    req.user = token;
    next();
  } catch (error) {
    res.status(401).send({
      message: error.message || 'Auth Failed.',
    });
  }
};

module.exports = {authMiddleware};
