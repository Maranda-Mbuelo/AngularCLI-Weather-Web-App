import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../Services/weather.service';
import { Root } from '../interfaces/weatherInterface';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {
  weatherData: Root = {} as Root;

  constructor(private activatedRoute: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const cityName = params.get('cityName');
      if(cityName){
        this.fetchWeatherDataByCityName(cityName);
      }
    })
  }

  fetchWeatherDataByCityName(cityName: string): void {
    this.weatherService.getWeatherData(cityName).subscribe(
      response => {
        this.weatherData = response;
        this.weatherData.main.temp = parseInt((this.weatherData.main.temp - 273.15).toFixed(0), 10);
        this.weatherData.main.temp_min = parseInt((this.weatherData.main.temp_min - 273.15).toFixed(0), 10);
        this.weatherData.main.temp_max = parseInt((this.weatherData.main.temp_max - 273.15).toFixed(0), 10);
        this.weatherData.main.feels_like = parseInt((this.weatherData.main.feels_like - 273.15).toFixed(0), 10);
        this.weatherData.wind.speed = this.weatherData.wind.speed * 3.6;
        this.weatherData.visibility = this.weatherData.visibility / 1000;
      },
      error => {
        console.error(error);
      }
    );
  }
}
