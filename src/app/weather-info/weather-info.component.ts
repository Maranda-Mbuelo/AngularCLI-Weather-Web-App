import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent {

  constructor(private homeComponent : HomeComponent){}
  isAllowed: boolean = true;
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
  
}
