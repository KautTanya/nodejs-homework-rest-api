const { current } = require("../../services/auth");
const { NotAuthorizedError } = require("../../helpers/errors");
const currentController = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await current(_id);
    res.status(200).json({
      user,
    });
  } catch (error) {
    const err = new NotAuthorizedError(
      "No found this token"
    );
    console.log(err);
  }
};
module.exports = {
  currentController,
};