const { Expo } = require("expo-server-sdk");

let expo = new Expo();

const sendNotification = async (users, body, title) => {
  let messages = [];
  users.forEach((user) => {
    if (!Expo.isExpoPushToken(user.token)) {
      console.error(`Push token ${user.token} is not a valid Expo push token`);
    } else {
      messages.push({
        to: user.token,
        sound: "default",
        body: body,
        // data: { withSome: 'data' },
        title: title,
      });
    }
  });

  let chunks = expo.chunkPushNotifications(messages);

  chunks.forEach(async (chunk) => {
    await expo.sendPushNotificationsAsync(chunk);
  });
};

module.exports = { sendNotification };
