const { authServices } = require("../services/auth.services");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res , next ) => {
    try {
      await authServices.register(req.body);
      res.status(200).send({
        success: true,
        error: null,
      });
    } catch (error) {
      next(error) ;
    }
  },
  login: async (req, res , next ) => {
    try {
      const user = await authServices.login(req.body);
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 24 * 60 * 60,
      });
      res.cookie("token", token , {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });
      res.status(200).send({
        success: true,
        error: null,
      });
    } catch (error) {
      next( error ) ;
    }
  },
};

module.exports = { authController };
