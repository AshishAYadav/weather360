import { Component } from "@angular/core";
import { Location, getCurrentLocation, isEnabled, distance, enableLocationRequest } from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
import { catchError } from 'rxjs/operators';

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(){

    }
    //Location Variables
    public lat=19.83;
    public lon=72.30;
    public distanceResult: string = "0";
    public distance: number = 0;
    public index: number = 0;

    public startpointLongitude: number = 42.696552;
    public startpointLatitude: number = 23.32601;
    public endpointLongitude: number = 40.71448;
    public endpointLatitude: number = -74.00598;


    public isLocationEnabled() {
        // >> check-is-service-enabled
        isEnabled().then(function (isLocationEnabled) {
            let message = "Location services are not available";
            if (isLocationEnabled) {
                message = "Location services are available";
            }
            alert (message);
        }, function (e) {
            console.log("Location error received: " + (e.message || e));
        });
        // << check-is-service-enabled
    }

    public getWeather() {
        getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            timeout: 5000
         }).then(location => {
                console.log("Location received: " + location.longitude);
                this.startpointLatitude = location.latitude;
                this.startpointLongitude = location.longitude;
               }, error => {
               console.log("ERROR: ", error);
            }).catch(error => {
                console.log("Location error received: " + error);
                alert("Location error received: " + error);
            });
        }
 }
