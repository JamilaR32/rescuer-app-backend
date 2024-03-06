const User = require("../../models/User");
const { sendNotification } = require("../../utils/sendNotifications");

const updateToken = async (req, res, next) => {
  try {
    await req.user.updateOne({
      token: req.body.token,
    });

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const sendNotificationMsg = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $in: req.body.users } });
    await sendNotification(users, req.body.body, req.body.title);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { updateToken, sendNotificationMsg };
