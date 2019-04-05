import { Component, OnInit,  ViewChild, ElementRef } from "@angular/core";
import { Http } from "@angular/http";
import  "rxjs";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/timeout";
import { Repeater } from "tns-core-modules/ui/repeater";
import { Page } from "tns-core-modules/ui/page";
import {Router} from "@angular/router"
import { EventData } from "tns-core-modules/data/observable";
import { letterSpacingProperty } from "tns-core-modules/ui/text-base/text-base";
import { isIOS } from "tns-core-modules/platform";
import { fromObject } from "tns-core-modules/data/observable";



@Component({
    selector:'ns-current-weather',
    templateUrl:'./current-weather.component.html',
    styleUrls:['./current-weather.component.css'],
    moduleId:module.id,
})

export class CurrentWeatherComponent implements OnInit{

    @ViewChild("rsd") rSideDrawer: ElementRef;

    PASS_SPN_TXT = '\xB0';
    API_KEY_1= "bab88f3b4258522620383b3202bf2b87";
    API_WEATHERMAP = "http://api.openweathermap.org/data/2.5/weather?";
    TELEPORT_API = "https://api.teleport.org/api/locations/";

    currentCity="Mumbai";
    currentTemperature=328;
    currentCelcius:number=58;
    currentFahrenheit:number=98;
    currentCountry="India";
    currentPicture="";
    currentUrl="";
    city = 2;

    cities: { index: number, name: string, lat:number,lon:number,tempc: number, tempf:number, img: string }[] = [
        {index: 0, name: "Mumbai, India",lat:19.2910, lon:72.8632,tempc: 21, tempf:68, img: "~/images/goa.jpg" },
        { index: 1, name: "New York, US",lat:40.7128,lon:74.0060,tempc: -5, tempf: 67, img: "~/images/mumbai.jpg" },
        { index: 2, name: "London, UK",lat:51.5074,lon:0.1278, tempc: 84,tempf: 69,  img: "~/images/somewhere.jpg" }
    ];

    name = this.cities[this.city].name;
    tempc = this.cities[this.city].tempc;
    tempf = this.cities[this.city].tempf;
    lat=this.cities[this.city].lat;
    lon=this.cities[this.city].lon;
    img = this.cities[this.city].img;
    //exec = this.changeBackgroundImage(this.lat,this.lon);


    constructor(private http: Http,
        private page:Page,
        private router:Router) {
    }
     ngOnInit(){
        //this.page.actionBarHidden = true;

        this.displayCurrentWeather();
       // this.page.backgroundImage='url('+this.currentPicture+')';

    }


    drawerLoaded(args) {
        let drawer = <RadSideDrawer>args.object;
        if (isIOS) {
            drawer.ios.defaultSideDrawer.style.shadowMode = 2;
            drawer.ios.defaultSideDrawer.style.dimOpacity = 0.12;
            drawer.ios.defaultSideDrawer.style.shadowOpacity = 0.75;
            drawer.ios.defaultSideDrawer.style.shadowRadius = 5;
            drawer.ios.defaultSideDrawer.transitionDuration = 0.25;
        }
    }

    onOpenDrawerTap(): void {
        this.rSideDrawer.nativeElement.toggleDrawerState();
    }
    chooseCity(args): void {
        let obj = this.cities[args.index];
        this.name = obj.name;
        this.tempc = obj.tempc;
        this.tempf = obj.tempf;
        this.img = obj.img;
        this.rSideDrawer.nativeElement.toggleDrawerState();
    }
    changeCity(c): void{
        if(c==1)
            this.city=(this.city+1)%Object.keys(this.cities).length;
        if(c==0)
            this.city=Math.abs(-this.city-1)%Object.keys(this.cities).length;

        console.log("City Loaded",this.cities[this.city].name);
        let obj = this.cities[this.city];

        this.name = obj.name;
        this.tempc = obj.tempc;
        this.tempf = obj.tempf;
        this.lat = obj.lat;
        this.lon = obj.lon;
        this.img = obj.img;
        this.displayCurrentWeather();

    }

     kelvinToCelsius(kelvin:number){
        return Math.trunc(kelvin-273.15);
    }
     kelvinToFahrenheit(kelvin:number){
        return Math.trunc((kelvin-273.15)*9/5+32);
    }

     displayCurrentWeather(){
        let mTemp:number;
        this.http.get(this.API_WEATHERMAP +"lat="+this.lat+"&lon="+this.lon+"&APPID="+this.API_KEY_1)
       .timeout(3000)
        .subscribe(result => {
            //console.log("RESULT: ", JSON.stringify(result));
            mTemp=result['_body']['main']['temp'];
            this.tempc=this.kelvinToCelsius(mTemp);
            this.tempf=this.kelvinToFahrenheit(mTemp);
            this.currentCity=result['_body']['name'];
            this.currentCountry=result['_body']['sys']['country'];
            this.name=this.currentCity+" , "+this.currentCountry;
        });

        //this.img = this.changeBackgroundImage();



    }
      changeBackgroundImage(){
        let temp;
        this.http.get(this.TELEPORT_API +=this.lat+","+this.lon)
        .timeout(2000)
        .subscribe(result => {
            //console.log("Result:", JSON.stringify(result));
            this.currentCity=result["_body"]["_embedded"]["location:nearest-cities"][0]["_links"]["location:nearest-city"]["name"];
            this.currentUrl=result["_body"]["_embedded"]["location:nearest-cities"][0]["_links"]["location:nearest-city"]["href"];
            let PICTURE_API=result["_body"]["_embedded"]["location:nearest-urban-areas"][0]["_links"]["location:nearest-urban-area"]["href"];
                this.http.get(PICTURE_API +"images").timeout(5000)
                .subscribe(result => {
                   this.currentPicture=result["_body"].photos[0].image.mobile;
                   //this.img = "url('"+this.currentPicture+"')";
                    console.log(JSON.stringify(this.currentPicture));
                    temp = "url('"+this.currentPicture+"| async ')";

                });
            if(this.currentCity==""){
                this.currentCity=result["_body"]["_embedded"]["location:nearest-urban-areas"][0]["_links"]["location:nearest-urban-area"]["name"];
                this.name=this.currentCity+" , "+this.currentCountry;
            }   });
            return temp;
    }
     mletsgo(){
        this.router.navigate(['../detail']);
    }
}
