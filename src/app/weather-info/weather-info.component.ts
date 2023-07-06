import { Component, OnInit, Input } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Root, Weather } from '../interfaces/weatherInterface';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {

  constructor(private homeComponent : HomeComponent){}
  @Input() root: Root = {} as Root; // decorate the property with @Input()
  weather: Weather[] = [];
  isAllowed: boolean = true;
  image: string | undefined;
  sunnyPic: string = `https://t3.ftcdn.net/jpg/00/13/19/36/360_F_13193603_FVfBgi1FYY6pL1ROAIDoCHIaeLLDIRON.jpg`;
  cloudyPic: string = `https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;
  rainingPic: string = `https://t3.ftcdn.net/jpg/01/64/12/10/360_F_164121097_P3SE3uaznLkuXTQGPQb5w4mEXgVUOLGd.jpg`;
  windyPic: string = `https://images.foxweather.com/static.foxweather.com/www.foxweather.com/content/uploads/2022/06/668/376/GettyImages-845340462.jpg?ve=1&tl=1`;

  toggleIsAllowed(): void {
    console.log(`clicked`);
    
    const element = document.querySelector<HTMLElement>('.information');
    if (element) {
      this.homeComponent.toggleComponents();
      if (this.isAllowed) {
        element.style.visibility = 'hidden';
      } else {
        element.style.visibility = 'visible';
      }
    }
    this.isAllowed = !this.isAllowed;
  }

  ngOnInit(): void {
    console.log(this.root);
    if (this.root.weather && this.root.weather.length > 0) {
      this.weather[0] = this.root.weather[0]; // Assign the weather array to the weather variable
    }

    (this.root.main.temp - 273.15).toFixed(0);
    
    // switch (true) {
    //   case this.root.main.temp < 15:
    //     this.image = this.cloudyPic;
    //     break;
    //   case this.root.main.temp >= 15 && this.root.main.temp < 25:
    //     this.image = this.sunnyPic;
    //     break;
    //   case this.root.main.temp >= 25 && this.root.main.temp < 30:
    //     this.image = this.windyPic;
    //     break;
    //   default:
    //     this.image = this.rainingPic;
    //     break;
    // }
    
  }

  getWeatherImage(): string {
    if (this.root.main.temp < 15) {
      return this.cloudyPic;
    } else if (this.root.main.temp >= 15 && this.root.main.temp < 25) {
      return this.sunnyPic;
    } else if (this.root.main.temp >= 25 && this.root.main.temp < 30) {
      return this.windyPic;
    } else {
      return this.rainingPic;
    }
  }
  
  
}
