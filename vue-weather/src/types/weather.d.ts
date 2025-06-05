export interface Condition {
  text: string;
  icon: string;
}

export interface CurrentWeather {
  temp_c: number;
  feelslike_c: number;
  condition: Condition;
  wind_kph: number;
  humidity: number;
  pressure_mb: number;
}

export interface Location {
  name: string;
  country: string;
  localtime: string;
}

export interface WeatherApiResponse {
  location: Location;
  current: CurrentWeather;
}