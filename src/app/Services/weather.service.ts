import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Root } from '../interfaces/weatherInterface';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  API_KEY = environment.API_Key;
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getWeatherData(cityName: string): Observable<Root> {
    const params = new HttpParams().set('q', cityName).set('appid', this.API_KEY);
  
    return this.http.get<Root>(`${this.API_URL}weather`, { params });
  }
  
}
