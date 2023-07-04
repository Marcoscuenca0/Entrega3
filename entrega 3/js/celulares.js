const carritoProductos = [];

const celulares = [
  { id: 1, imagen: "../images/p60.jpg", nombre: "p60", precio: 100000 },
  { id: 2, imagen: "./images/s10.jpg", nombre: "samsung s10", precio: 90000 },
  { id: 3, imagen: "./images/iphone14pro.jpg", nombre: "iphone 14 pro", precio: 400000 },
  { id: 4, imagen: "/images/s10e.jpg", nombre: "samsung s10e", precio: 60000 },
  { id: 5, imagen: "/images/samsung20plus.jpg", nombre: "samsung s20 plus", precio: 150000 },
  { id: 6, imagen: "/images/samsungs23.jpg", nombre: "samsung s23 plus", precio: 280000 },
  { id: 7, imagen: "/images/iphone-13-pro-max.jpg", nombre: "iphone 13 pro max", precio: 160000 },
  { id: 8, imagen: "./images/OnePlus-10-pro.jpg", nombre: "one plus 10 pro", precio: 200000 },
];

const guardarEnLocalStorage = () => {
  if (carritoProductos.length > 0) {
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
  }
};

const recuperarCarritoDeLocalStorage = () => {
  if (localStorage.getItem('carrito')) {
    return JSON.parse(localStorage.getItem('carrito'));
  } else {
    return [];
  }
};

const mostrarMensajes = (mensaje) => {
  const div = document.querySelector('.card');
  div.textContent = mensaje || '';
};

