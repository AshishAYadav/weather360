import { Component } from "@angular/core";
import { Http } from "@angular/http";
import  "rxjs";
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/timeout";
import { Repeater } from "tns-core-modules/ui/repeater";
import { Page } from "tns-core-modules/ui/page";



@Component({
    selector:'ns-current-weather',
    templateUrl:'./current-weather.component.html',
    styleUrls:['./current-weather.component.css'],
    moduleId:module.id
})

export class CurrentWeatherComponent{
    PASS_SPN_TXT = '\xB0';
    API_KEY_1= "bab88f3b4258522620383b3202bf2b87";
    API_WEATHERMAP = "http://api.openweathermap.org/data/2.5/weather?";
    TELEPORT_API = "https://api.teleport.org/api/locations/";

    currentCity="Mumbai";
    currentTemperature=328;
    currentCelcius:number=55;
    currentFahrenheit:number=98;
    currentCountry="India";
    currentPicture="";
    currentUrl="";
    currentTitle="";
    currentLat=19.2910;
    currentLon=72.8632;
    scrollDown="v";

    a=this.displayCurrentWeather();

    constructor(private http: Http) {
        //enableLocationRequest(true);
        //this.getWeather();
    }
    public kelvinToCelsius(kelvin:number){
        return Math.trunc(kelvin-273.15);
    }
    public kelvinToFahrenheit(kelvin:number){
        return Math.trunc((kelvin-273.15)*9/5+32);
    }

    public displayCurrentWeather(){
        let mTemp:number;
        this.http.get(this.API_WEATHERMAP +"lat="+this.currentLat+"&lon="+this.currentLon+"&APPID="+this.API_KEY_1)
       .timeout(3000)
        .subscribe(result => {
            //console.log("RESULT: ", JSON.stringify(result));
            mTemp=result['_body']['main']['temp'];
            this.currentCelcius=this.kelvinToCelsius(mTemp);
            this.currentFahrenheit=this.kelvinToFahrenheit(mTemp);
            this.currentCity=result['_body']['name'];
            this.currentCountry=result['_body']['sys']['country'];
            this.currentTitle=this.currentCity+" , "+this.currentCountry;
        });
        this.http.get(this.TELEPORT_API +this.currentLat+","+this.currentLon).timeout(5000)
        .subscribe(result => {
            //console.log("Result:", JSON.stringify(result));
            this.currentCity=result["_body"]["_embedded"]["location:nearest-cities"][0]["_links"]["location:nearest-city"]["name"];
            this.currentUrl=result["_body"]["_embedded"]["location:nearest-cities"][0]["_links"]["location:nearest-city"]["href"];
            if(this.currentPicture==""){
            let PICTURE_API=result["_body"]["_embedded"]["location:nearest-urban-areas"][0]["_links"]["location:nearest-urban-area"]["href"];
                this.http.get(PICTURE_API +"images").timeout(5000)
                .subscribe(result => {
                   this.currentPicture=result["_body"].photos[0].image.mobile;
                    console.log(JSON.stringify(this.currentPicture));
                });
            }
            if(this.currentCity==""){
                this.currentCity=result["_body"]["_embedded"]["location:nearest-urban-areas"][0]["_links"]["location:nearest-urban-area"]["name"];

            }   });
    }

}
