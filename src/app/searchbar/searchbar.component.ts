import { Component, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  @Output() newItemEvent = new EventEmitter<string>();
  cityName: string = '';

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
}

  searchCity() {
    this.newItemEvent.pipe(
      debounceTime(200), // Add a debounce time to delay the API request
      distinctUntilChanged() // Only emit a new value if it's different from the previous value
    ).subscribe((value) => {
      this.addNewItem(value);
  });
}

onKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    console.log('Enter key pressed');
    this.addNewItem(this.cityName);
  }
}


  constructor(private weatherService: WeatherService) { }

}
