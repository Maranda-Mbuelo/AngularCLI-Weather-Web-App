import { Component, OnInit, Input } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Root, Weather } from '../interfaces/weatherInterface';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {

  paragraph: string = 'Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that';

  constructor(private homeComponent : HomeComponent){}
  @Input() root: Root = {} as Root; // decorate the property with @Input()
  weather: Weather[] = [];
  isAllowed: boolean = true;
  isSunny: boolean = false;
  isCold: boolean = false;
  isRaining: boolean = false;
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
  }

  getWeatherImage(): string {
    if (this.root.main.temp <= 15) {
      this.paragraph = `Bundle up, my friend! It's so cold outside that penguins are wearing jackets and polar bears are sipping hot cocoa. Make sure to bring your warmest sweater and embrace the cozy vibes. Hot chocolate and snuggles are highly recommended!`;
      this.isCold = true;
      return this.cloudyPic;
    } else if (this.root.main.temp >= 16) {
      this.paragraph = `Who turned up the heat? It's so hot outside that the sun is challenging you to a tanning competition. Stay cool, grab your shades, and seek refuge under the nearest shade-giving tree. Don't forget to hydrate and imagine yourself on a tropical beach with a refreshing drink in hand!`;
      this.isSunny = true;
      return this.sunnyPic;
    }else {
      this.isRaining = true;
      this.paragraph = `Grab your umbrella and channel your inner Gene Kelly because it's raining cats and dogs! The weather forecast is calling for a symphony of puddles and spontaneous dance moves. Embrace the wet adventure, splash around, and remember that rainy days are just nature's way of keeping us on our toes (and wet socks).`;
      return this.rainingPic;
    }
  }
}
