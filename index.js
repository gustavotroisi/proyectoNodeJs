const args = process.argv.slice(2);

switch (args[0]) {
  case "GET":
    console.log("Se recibió un método GET");
    if (args[1] && args[1] == "products") {
      get_products();
    } else if (args[1] && args[1].indexOf("products/") == 0) {
      const prod = args[1].split("/");
      if (prod[1]) {
        if (Number.isInteger(Number(prod[1]))) {
          get_product(prod[1]);
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
  case "POST":
    console.log("Se recibió un método POST");
    const product = { title: args[2], price: args[3], category: args[4] };
    if (args[1] && args[2] && args[3] && args[4]) {
      create_product(product);
    } else {
      console.log("Faltan datos para el POST.");
    }
    break;
  case "DELETE":
    console.log("Se recibió un método DELETE");

    if (args[1]) {
      if (args[1].indexOf("products/") == 0) {
        const prod = args[1].split("/");
        if (prod[1]) {
          if (Number.isInteger(Number(prod[1]))) {
            delete_product(prod[1]);
          } else {
            console.log("El ID debe ser un número entero.");
          }
        } else {
          console.log("Falta el ID del producto.");
        }
      } else {
        console.log("El método ingresado es incorrecto.");
      }
    } else {
      console.log("El método DELETE esta incompleto.");
    }
    break;
  default:
    console.log("Falta enviar el metodo.");
}

function get_products() {
  console.log("Obtener todos los productos");
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function get_product(id) {
  console.log(`Obtener el producto id ${id}`);
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function create_product(product) {
  console.log("Crear producto");
  console.log(product);

  fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function delete_product(id) {
  console.log(`Eliminar producto ${id}`);
  fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
