const fs = require("fs")

class ProductsServices {
    constructor() {
      this.products = "./src/data/products.json";
  }

  //Verifica si existe el archivo 'products.json'
  async existFile() {
    try {
      fs.accessSync(this.products);
      return true;
    } catch (error) {
      return false;
    }
  }

  async readFile(fileName) {
    try {
      const file = await fs.promises.readFile(fileName, "utf-8");
      return JSON.parse(file);
    } catch (error) {
      console.log(`error al leer el archivo, error: ${error}`);
    }
  }

  async validateId() {
    let file = await this.readFile(this.products);
    if (file.length) {
      let idMayor = file.reduce((p, c) => {
        return c.id > p ? c.id : p;
      }, 0);
      return idMayor + 1;
    }
    return 1;
  }

  async getProducts() {
    return (await this.readFile(this.products));
  }

  async addProduct(obj) {
    //Verifica que todos los campos sean obligatorios
    let { title, description, code, price, stock, category, thumbnail } = obj;

    //Verifica que el campo thumbnail contenga informacion. de lo contrario lo establece en []
    if(!thumbnail){
        thumbnail = []
      }

    try {
      let file = [];
      if (await this.existFile()) {
        file = await this.readFile(this.products);
      }
      file.push({
        id: await this.validateId(),
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnail,
      });
      let objeto = JSON.stringify(file, null, 2);
      await fs.promises.writeFile(this.products, objeto);
      
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId) {
    let products = await this.readFile(this.products);
    let product = products.find((producto) => producto.id === Number(productId));
    return product
  }

  async deleteProduct(productId) {
    console.log(productId)
    let products = await this.readFile(this.products);
    let operacionEliminar = products.findIndex((producto) => producto.id === Number(productId));

    if (operacionEliminar !== -1) {
        products.splice(operacionEliminar, 1);
      await fs.promises.writeFile(this.products, JSON.stringify(products, null, 2));
      return true
    } else {
      return false
    }
  }

  async updateProduct(obj, id) {
    let products = await this.readFile(this.products);
    let oldObj = products.find((producto) => producto.id === Number(id));

    //Verifica si ya hay un producto con el mismo code.
    let verifyCode = await products.some((product) => product.code === obj.code);
    if (verifyCode && obj.code != oldObj.code) return "existCode"
    
    let operacionUpdate = products.findIndex((producto) => producto.id === Number(id));
    if (operacionUpdate !== -1) {
        products[operacionUpdate] = {...oldObj, ...obj};
        await fs.promises.writeFile(this.products, JSON.stringify(products, null, 2));
        return true
    } else {
      return false
    }
  }
}

module.exports = new ProductsServices();