window.onload = function(){
  document.getElementsByClassName('getForm')[0].addEventListener('submit',retrieveAPI);
}

function removeCard(e){
  e.preventDefault();

  let elem = e.currentTarget;
  elem.parentElement.parentElement.remove();
}

function retrieveAPI(e){
  e.preventDefault();

  const apiKey = 'b2702f5289349318c84a2ce33183805b';
  let city = document.getElementById('cityInput').value;
  let link = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', link, true);
  xhr.onload = function(){
    if(this.status == 200){
      let info = JSON.parse(this.responseText);
      let weathertype = info.weather[0].id;
      let image = "";
      switch (Math.round(weathertype/100)) {
        case 2:
          image = "/Images/thunderstorm.gif";
          break;
        case 3:
          image = "/Images/Drizzle.png";
          break;
        case 5:
          image = "/Images/rain.png";
          break;
        case 6:
          image = "/Images/Snow.png";
          break;
        case 7:
          image = "/Images/Atmosphere.jpg";
          break;
        case 8:
          if (weathertype == 800)
          {
            image = "/Images/Clear.png";
          }else{
            image = "/Images/Cloud.png";
          }
          break;
        default:
          image = "error";
      }
      let cityName = info.name;
      let temperature = Math.round((info.main.temp-273.15)*100)/100;
      let weather = info.weather[0].main;
      let description = info.weather[0].description;
      let output = document.getElementsByClassName("result")[0].innerHTML;
      output += `
      <div class = "col-md-6 col-lg-3 py-3 cardSection">
        <div class = "card h-100 text-center py-3">
          <img src = ${image} class="card-img-top py-2 px-2 image-fluid"/>
          <h5>${cityName}</h5>
          <h5>(${temperature}°C)</h5>
          <h6>Weather: ${weather}</h6>
          <h6>Desciption: ${description.charAt(0).toUpperCase()+description.slice(1)}</h6>
          <form class= "removeButton">
            <button type="submit" class="btn btn-primary mb-2">Remove</button>
          </form>
        </div>
      </div>`;

      document.getElementsByClassName("result")[0].innerHTML=output;

      let everyCards = document.getElementsByClassName('removeButton');
      for (let i = 0; i < everyCards.length; i++){
        everyCards[i].addEventListener('submit',removeCard);
      }
    }
  }
  xhr.send();
}
