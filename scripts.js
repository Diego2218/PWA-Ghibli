const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
var url = 'https://ghibliapi.herokuapp.com/films';

request.onload = function () {

if(navigator.onLine){
  request.open('GET', url, true);
  request.send();

  var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400){
      cargarDatos(data);
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `It's not working! :( `;
        app.appendChild(errorMessage);
      }
} else {
  if ('caches' in window) {
  caches.match(url).then(function(response) {
            if (response) {
                cargarDatos(response.json());
            }
        });
    }
}
  /*if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {

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
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `It's not working! :( `;
    app.appendChild(errorMessage);
  }*/

}

function cargarDatos(response){
  console.log(response);
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
