import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { AppComponent } from "./app.component";
import { CurrentWeatherComponent } from "./components/current-weather/current-weather.component";
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import { DetailWeatherComponent } from './components/detail-weather/detail-weather.component';
import {NativeScriptRouterModule} from "nativescript-angular/router"
import {routes,navigatableComponents} from './app.routing';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
         NativeScriptFormsModule,
         NativeScriptHttpModule,
         NativeScriptRouterModule,
         NativeScriptRouterModule.forRoot(routes),
         NativeScriptUISideDrawerModule

    ],
    declarations: [
        AppComponent,
        CurrentWeatherComponent,
        DetailWeatherComponent,
        ...navigatableComponents
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
