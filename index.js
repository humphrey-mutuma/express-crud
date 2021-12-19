const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const engine = require("express-handlebars").engine;
const members = require("./Members");

const app = express();

// init middleware
app.use(logger);

// express-handlebars mi ddleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// homepage route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Members App",
    members: members, // passing members array to index.handlebars
  });
});
// set static folder
app.use(express.static(path.join(__dirname, "public")));

// members api route
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
