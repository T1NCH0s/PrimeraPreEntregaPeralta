const express = require('express');
const PORT = 8080;
const routes = require("./routes")

class Server{
 constructor() {
  this.app = express();
  this.settings();
  this.routes();
 }

 settings(){
  this.app.use(express.json());
  this.app.use(express.urlencoded({extended:true}));
  this.app.use("/static",express.static(`${__dirname}/public`));
 }

 routes(){
  routes(this.app);
 }

 listen(){
  this.app.listen(PORT, ()=> {console.log(`http:localhost:${PORT}`)});
 }
}

module.exports = new Server();