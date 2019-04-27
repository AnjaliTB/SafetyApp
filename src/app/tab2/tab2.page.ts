import { Component } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
 
  constructor(private geolocation: Geolocation,private launchNavigator: LaunchNavigator) { }
  startTracking(){
   console.log("Tab2");
   var options
   this.launchNavigator.navigate("London, UK", {
    start: "Manchester, UK"
});
  }
}

