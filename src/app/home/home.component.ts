import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private weatherService : WeatherService){}
  

  ngOnInit(): void {
    this.fetchData();
  }

  toggleComponents(): void{
    const elements = document.querySelectorAll<HTMLElement>('.searchbar, .weather');

    if(elements){
      elements.forEach(element => {
        element.classList.toggle('hidden');
      });
    }
  }

  fetchData(): void {
    this.weatherService.getWeatherData('johannesburg')
    .subscribe(
      response => {
        console.log(response);
      }
    )
  }
}
