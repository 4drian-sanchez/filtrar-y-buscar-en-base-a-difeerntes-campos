const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const resultado = document.querySelector("#resultado");

document.addEventListener("DOMContentLoaded", initApp);

//Objeto que almacena los resultado de busqueda de los inputs
const resultadoBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

function initApp() {
  //Llena el select con los años
  llenarSelect();
  //Muestra el listado de carros
  mostrarAutos(autos);

  //Eventos

  /* Cada una de los siguientes eventos
  filtra el resultado de busuqueda */
  marca.addEventListener("change", (e) => {
    resultadoBusqueda.marca = e.target.value;
    filtrarAutos();
  });

  year.addEventListener("change", (e) => {
    resultadoBusqueda.year = e.target.value;
    filtrarAutos();
  });

  minimo.addEventListener("change", (e) => {
    resultadoBusqueda.minimo = e.target.value;
    filtrarAutos();
  });

  maximo.addEventListener("change", (e) => {
    resultadoBusqueda.maximo = e.target.value;
    filtrarAutos();
  });

  puertas.addEventListener("change", (e) => {
    resultadoBusqueda.puertas = e.target.value;
    filtrarAutos();
  });

  transmision.addEventListener("change", (e) => {
    resultadoBusqueda.transmision = e.target.value;
    filtrarAutos();
  });

  color.addEventListener("change", (e) => {
    resultadoBusqueda.color = e.target.value;
    filtrarAutos();
  });
}

//Funciones
//Mostrar el listado de autos
function mostrarAutos(autos) {
  cleanHTML();
  autos.forEach((auto) => {
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;
    const autosResultado = document.createElement("P");
    autosResultado.textContent = `${marca} - ${modelo} - ${year} - ${precio} - ${puertas} ${color} ${transmision}`;
    resultado.appendChild(autosResultado);
  });
}

//Filtra los autos
function filtrarAutos() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    alerta();
  }
}

//Filtra por marca
function filtrarMarca(auto) {
  const { marca } = resultadoBusqueda;
  if (marca) {
    return marca === auto.marca;
  }
  return auto;
}

//Filtra por año
function filtrarYear(auto) {
  const { year } = resultadoBusqueda;
  if (year) {
    return auto.year.toString() === resultadoBusqueda.year;
  }
  return auto;
}

//Filtra por minimo
function filtrarMinimo(auto) {
  const { minimo } = resultadoBusqueda;
  if (minimo) {
    return parseInt(minimo) >= auto.precio;
  }
  return auto;
}

//Filtra por minimo
function filtrarMinimo(auto) {
  const { minimo } = resultadoBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

//Filtra por maximo
function filtrarMaximo(auto) {
  const { maximo } = resultadoBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = resultadoBusqueda;
  if (puertas) {
    return parseInt(puertas) === auto.puertas;
  }
  return auto;
}

//Filtrar transmision
function filtrarTransmision(auto) {
  const { transmision } = resultadoBusqueda;
  if (transmision) {
    return transmision === auto.transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = resultadoBusqueda;
  if (color) {
    return color === auto.color;
  }
  return auto;
}

//Llenar el select de años
function llenarSelect() {
  for (let i = 2000; i <= 2020; i++) {
    const option = document.createElement("OPTION");
    option.textContent = i;
    year.appendChild(option);
  }
}

//Limpiar html previo
function cleanHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function alerta() {
  cleanHTML();
  const alerta = document.createElement("P");
  alerta.className = "alerta";
  alerta.textContent = "No se encontraron resultados";
  resultado.appendChild(alerta);
}
