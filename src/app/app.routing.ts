import {CurrentWeatherComponent} from './components/current-weather/current-weather.component';
import {DetailWeatherComponent} from './components/detail-weather/detail-weather.component';

 export const routes = [
     {path : '', component: CurrentWeatherComponent},
     {path : 'detail', component: DetailWeatherComponent}

 ];

 export const navigatableComponents=  [
     CurrentWeatherComponent,
     DetailWeatherComponent
 ];
