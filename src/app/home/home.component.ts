import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { Root } from '../interfaces/weatherInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherInformation: Root = {
    coord: { lon: 0, lat: 0 },
    weather: [],
    base: '',
    main: { 
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
      grnd_level: 0
    },
    visibility: 0,
    wind: { speed: 0, deg: 0, gust: 0 },
    rain: { "1h": 0 },
    clouds: { all: 0 },
    dt: 0,
    sys: { type: 0, id: 0, country: '', sunrise: 0, sunset: 0 },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0
  };

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.fetchData('Johannesburg');
    const element = document.querySelector<HTMLElement>('.myInformation');
    if (element instanceof HTMLElement && element) {
      element.style.visibility = 'hidden';
      element.style.display = 'none';
    }
  }

  toggleComponents(): void {
    const elements = document.querySelectorAll<HTMLElement>('.searchbar, .weather');
    const element = document.querySelector<HTMLElement>('.weather');

    if (elements && element instanceof HTMLElement) {
      element.style.visibility = 'visible';
      elements.forEach(element => {
        element.classList.toggle('hidden');
      });
    }
  }

  fetchData(cityName: string): void {
    this.weatherService.getWeatherData(cityName).subscribe(
      response => {
        // console.log(response);
        this.weatherInformation = response;
        this.weatherInformation.main.temp = parseInt((this.weatherInformation.main.temp - 273.15).toFixed(0), 10);
        console.log(this.weatherInformation)
      },
      error => {
        console.error(error);
        // Handle the error condition if necessary
      }
    );
  }

  handleWeatherData(cityName: string) {
    this.fetchData(cityName);
  }
  
  
}
