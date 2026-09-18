const args = process.argv.slice(2);

switch (args[0]) {
  case "GET":
    console.log("Se recibió un método GET");
    if (args[1] == "products") {
      get_products();
    } else if (args[1].indexOf("products/") == 0) {
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
    const datos = [args[1], args[2], args[3]];
    create_product(datos);
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
      console.log("El método ingresado esta incompleto.");
    }
    break;
  default:
    console.log("El método ingresado es incorrecto.");
}

function get_products() {
  console.log("Obtener todos los productos");
}

function get_product(id) {
  console.log(`Obtener el producto id ${id}`);
}

function create_product(datos) {
  console.log("Crear producto");
  console.log(datos);
}

function delete_product(id) {
  console.log(`Eliminar producto ${id}`);
}
