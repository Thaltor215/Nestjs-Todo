import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherData } from 'src/interface/weather.interface';

@Controller('weather')
export class WeatherController {
  constructor(private readonly httpService: HttpService) {}

  @Get('')
  GetWeatherToday(): Observable<WeatherData> {
    const key = 'b52edb414347e381797772bd422dc493';
    const lat = '-33.929907';
    const long = '18.417078';

    // icon url https://openweathermap.org/img/wn/{weather[0].icon}@2x.png

    return this.httpService
      .get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=${key}`,
      )
      .pipe(map((response: AxiosResponse<WeatherData>) => response.data));
  }
}
