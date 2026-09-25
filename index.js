const args = process.argv.slice(2);

switch (args[0]) {
  /*
   *
   * --------------------------- GET ---------------------------
   *
   */
  case "GET":
    console.log("Se recibió un método GET");

    if (args[1] && args[1] == "products") {
      const products = await get_products();
      console.log(products);
    } else if (args[1] && args[1].startsWith("products/")) {
      const prod = args[1].split("/");
      if (prod[1]) {
        if (Number.isInteger(Number(prod[1]))) {
          const product = await get_product(prod[1]);
          console.log(product);
        } else {
          console.log("El ID debe ser un número entero.");
        }
      } else {
        console.log("Falta el ID del producto.");
      }
    } else {
      console.log("El destino del GET es incorrecto.");
    }
    break;
  /*
   *
   * --------------------------- POST ---------------------------
   *
   */
  case "POST":
    console.log("Se recibió un método POST");
    const product = { title: args[2], price: args[3], category: args[4] };

    if (args[1] == "products" && args[2] && args[3] && args[4]) {
      const crear = await create_product(product);
      console.log(`Se creo el producto y se le asigno el id ${crear}`);
    } else {
      console.log("Metodo POST mal estructurado.");
    }
    break;
  /*
   *
   * --------------------------- DELETE ---------------------------
   * *
   */
  case "DELETE":
    console.log("Se recibió un método DELETE");

    if (args[1]) {
      if (args[1].startsWith("products/")) {
        const prod = args[1].split("/");
        if (prod[1]) {
          if (Number.isInteger(Number(prod[1]))) {
            const eliminar = await delete_product(prod[1]);
            console.log(`Se elimino el producto con id ${eliminar.id}`);
            console.log(eliminar);
          } else {
            console.log("El ID debe ser un número entero.");
          }
        } else {
          console.log("Falta el ID del producto.");
        }
      } else {
        console.log("Metodo DELETE mal estructurado.");
      }
    } else {
      console.log("El método DELETE esta incompleto.");
    }
    break;
  default:
    console.log("Falta enviar el metodo.");
}

/*
 *
 * --------------------------- Funciones ---------------------------
 *
 */

//Obtener todos los productos
async function get_products() {
  console.log("Obtener todos los productos");

  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Obtener un producto por el id
async function get_product(id) {
  console.log(`Obtener el producto id ${id}`);

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Crear un producto
async function create_product(product) {
  console.log("Crear producto");
  console.log(product);

  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.log(error);
  }
}

//Eliminar un producto por el id
async function delete_product(id) {
  console.log(`Eliminar producto con id ${id}`);
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
