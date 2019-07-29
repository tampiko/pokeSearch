class Pokemon {
  constructor(nombre, imagen, id, movimientos) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.id = id;
    this.movimientos = { movimientos };
  }
}

var input = document.getElementById('nombreBuscar');
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    pokeBusca();
  }
});

let criatura;
let pokeBusca = () => {
  let nombreBuscar1 = document.getElementById('nombreBuscar').value;
  if (nombreBuscar1 === '') {
    mensaje('Escribe el nombre de un Pokemon', 'error', 1500);
    return;
  }
  nombreBuscar = nombreBuscar1.toLowerCase();
  document.getElementById('nombreBuscar').value = nombreBuscar;
  Swal.fire({
    allowOutsideClick: false,
    type: 'question',
    text: 'Enviando a la Busqueda de Pokemones...'
  });
  Swal.showLoading();
  fetch(`https://pokeapi.co/api/v2/pokemon/${nombreBuscar}`).then((pokemon) => {
    Swal.close();
    if (pokemon.status === 200) {
      pokemon.json().then(data => {
        mensaje('Pokemon encontrado', 'success');
        limpiaInformacion();
        // criatura = new Pokemon(data.name, data.sprites.back_default, data.id, [data.moves[0].move.name, data.moves[1].move.name, data.moves[2].move.name, data.moves[3].move.name]);
        document.getElementById('lblId').innerHTML = data.id;
        document.getElementById('lblNombre').innerHTML = data.name;
        document.getElementById('imgPokemon1').src = data.sprites.front_default;
        document.getElementById('imgPokemon2').src = data.sprites.back_default;
        document.getElementById('imgPokemon3').src = data.sprites.front_shiny;
        document.getElementById('imgPokemon4').src = data.sprites.back_shiny;
        data.moves.forEach((move) => {
          let node = document.createElement('li');
          let texto = document.createTextNode(move.move.name);
          node.appendChild(texto);
          node.classList.add('animate', 'fadeIn', 'infinite');
          document.getElementById('lstMovimientos').appendChild(node);
        });
      });
    } else {
      limpiaInformacion();
      mensaje('Pokemon NO encontrado', 'error');
    }
  });
}

let mensaje = (msg, tipo, tiempo = 1000) => {
  Swal.fire({
    position: 'center',
    type: tipo,
    title: msg,
    showConfirmButton: false,
    timer: tiempo
  })
}

let limpiaInformacion = () => {
  document.getElementById('lblId').innerHTML = '';
  document.getElementById('lblNombre').innerHTML = '';
  document.getElementById('imgPokemon1').src = '';
  document.getElementById('imgPokemon2').src = '';
  document.getElementById('imgPokemon3').src = '';
  document.getElementById('imgPokemon4').src = '';
  document.getElementById('lstMovimientos').innerHTML = '';
}