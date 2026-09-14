require("dotenv").config();
const { App } = require("@slack/bolt");
const schedule = require("node-schedule");
console.log("BOT TOKEN LOADED:", process.env.SLACK_BOT_TOKEN ? "yes" : "no");
console.log("APP TOKEN LOADED:", process.env.SLACK_APP_TOKEN ? "yes" : "no");
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

app.command("/stardanceping", async ({ command, ack, respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

schedule.scheduleJob("0 19 * * *", async () =>{
  try {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.SLACK_USER_ID,
      text: " Reminder: did you make progress on Stardance today? Log it if you haven't yet!"
    });
    console.log("Sent daily reminder");
} catch (err) {
    console.error("Failed to send reminder:", err);
}
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();



