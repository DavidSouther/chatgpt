import express from "express";
import * as chat from "./chat.js";

const app = express();
const router = express();
router.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
router.use("/chat", async (req, res) => {
  const prompt = req.query.q;
  const response = await chat.run(prompt);
  res.json(response);
});

app.use("/api", router);

app.listen(3000, () => {
  console.log("Listening");
});
