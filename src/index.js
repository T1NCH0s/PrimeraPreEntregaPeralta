require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const handlebars = require("express-handlebars");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

//express() = app
express().post("/subidaarchivo", upload.single("file"), (req, res) => {
  res.send("Se subio con exito!");
});

class Server {
  constructor() {
    this.app = express();
    this.settings();
    this.routes();
    this.upload == multer({
      storage,
    });
  }

  settings() {
    //Handlebars
    this.app.engine("handlebars", handlebars.engine());
    this.app.set("view engine", "handlebars");
    this.app.set("views", __dirname + "/views");

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/static", express.static(`${__dirname}/public`));
  }

  routes() {
    routes(this.app);
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`http:localhost:${process.env.PORT}`);
    });
  }
}

module.exports = new Server();
