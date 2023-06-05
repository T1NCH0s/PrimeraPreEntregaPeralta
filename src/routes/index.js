const productsApi = require("../components/products")
const cartsApi = require("../components/carts")

module.exports = (app) => {
  productsApi(app)
  cartsApi(app)
  app.get("/", (req, res) => {
    let htmlBody = ``;
    htmlBody += `<h1 style="">¡Bienvenido!</h1>`;
    htmlBody += `<a href="http://localhost:8080/api/products">Explora productos</a>`;
    htmlBody += `<a href="http://localhost:8080/api/carts">Explora tu carrito</a>`;
    res.send(htmlBody);
  });
};
