const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);
var url = 'https://ghibliapi.herokuapp.com/films';

function conexion(){
  if(navigator.onLine){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        cargarDatos(JSON.parse(this.response));
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }
  else {
    if ('caches' in window) {
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {            
            cargarDatos(json);
          });
        }
      });
    }
  }
}

function cargarDatos(response){
  response.forEach(movie => {

    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const h1 = document.createElement('h1');
    h1.textContent = movie.title;

    const p = document.createElement('p');
    movie.description = movie.description.substring(0, 300);
    p.textContent = `${movie.description}...`;

    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p);
  });
}

//request.send();
