window.onload = function(){
  document.getElementsByClassName('getForm')[0].addEventListener('submit',retrieveAPI);
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
      let output = `
      <div>
        <h4>${info.name}</h4>
        <h5>${info.weather[0].main} at ${Math.round((info.main.temp-273.15)*100)/100}°C</h5>
      </div>`;

      document.getElementsByClassName("result")[0].innerHTML=output;
    }
  }
  xhr.send();
}
