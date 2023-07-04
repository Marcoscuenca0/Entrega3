const section = document.querySelector('section');
const inputSearch = document.querySelector('#buscador');

function retornoCardHTML(producto) {
  return `
    <div class="container">
      <div class="card">
        <figure class="articulo">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </figure>
        <div class="contenido">
          <h3 class="articulo">${producto.nombre}</h3>
          <h5>${producto.precio}</h5>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam accusantium ullam optio fuga totam! Perferendis ipsum, est cumque, repudiandae, reprehenderit porro dolorem quam vitae fugit harum voluptas quasi. Quidem, rerum.</p>
          <button class="clickbtn" data-id="${producto.id}">Agregar al carrito</button>
          <button class="comprar-btn" data-id="${producto.id}">Comprar</button>
        </div>
      </div>
    </div>
  `;
}

function cargarProductos(celulares) {
  section.innerHTML = '';
  celulares.forEach((producto) => section.innerHTML += retornoCardHTML(producto));
  activarClickEnBotones();
}

const filtrarProductos = () => {
  let resultado = celulares.filter((produc) => produc.nombre.toLowerCase().includes(inputSearch.value.trim().toLowerCase()));
  if (resultado.length > 0) {
    cargarProductos(resultado);
  }
};

inputSearch.addEventListener('search', filtrarProductos);

const activarClickEnBotones = () => {
  const botones = document.querySelectorAll(".clickbtn");
  for (let boton of botones) {
    boton.addEventListener("click", () => {
      let resultadoProducto = celulares.find((producto) => producto.id === parseInt(boton.dataset.id));
      carritoProductos.push(resultadoProducto);
      guardarEnLocalStorage();
      mostrarMensajes(`El celular ${resultadoProducto.nombre} se guardó en el carrito`);
    });
  }

  const comprarBotones = document.querySelectorAll(".comprar-btn");
  for (let boton of comprarBotones) {
    boton.addEventListener("click", () => {
      let resultadoProducto = celulares.find((producto) => producto.id === parseInt(boton.dataset.id));
      carritoProductos.push(resultadoProducto);
      guardarEnLocalStorage();
      mostrarMensajes(`¡Venta realizada con éxito!`);

      const totalPrecios = sumarPrecios(carritoProductos);
      const resultadoCelulares = document.querySelector("div.resultado");
      resultadoCelulares.textContent = "Total de precios de los celulares: " + totalPrecios;

      boton.disabled = true; // Deshabilitar el botón "Comprar" después de la compra

      const devolverBtn = document.createElement('button');
      devolverBtn.innerText = 'Devolver';
      devolverBtn.classList.add('devolver-btn');
      devolverBtn.dataset.id = boton.dataset.id;
      devolverBtn.addEventListener('click', () => {
        devolverProducto(devolverBtn.dataset.id);
        devolverBtn.remove(); // Eliminar el botón "Devolver" después de hacer clic en él
      });

      boton.parentNode.appendChild(devolverBtn);
    });
  }
};

function sumarPrecios(carritoProductos) {
  let total = 0;
  for (let i = 0; i < carritoProductos.length; i++) {
    total += carritoProductos[i].precio;
  }
  return total;
}

function devolverProducto(id) {
  const index = carritoProductos.findIndex((producto) => producto.id === parseInt(id));
  if (index !== -1) {
    carritoProductos.splice(index, 1);
    guardarEnLocalStorage();
    mostrarMensajes(`El producto ha sido devuelto.`);
  }
}

cargarProductos(celulares);