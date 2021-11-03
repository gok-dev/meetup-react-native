const app = require("express")();
const { createProxyMiddleware } = require("http-proxy-middleware");

const SERVICE_URL = process.env.URL;
const TOKEN = process.env.TOKEN;

app.use(
  "/api/users",
  createProxyMiddleware({
    target: SERVICE_URL,
    headers: {
      "app-id": TOKEN,
    },
    secure: false,
    changeOrigin: true,
  })
);

module.exports = app;
