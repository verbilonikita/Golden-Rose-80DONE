const dotenv = require("dotenv");
const app = require("./app.js");

app.listen(3000, () => {
  console.log("server is running");
});

dotenv.config({ path: "./config.env" });
