import { Component } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, LoadingController } from '@ionic/angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  lat:number;
  lang:number;
  msg:string;
  loc:string;
  constructor(private loadingController: LoadingController,
    private smsVar: SMS,
    private callNumber: CallNumber, 
    private geolocation:Geolocation, 
    public navCtrl: NavController, 
    private launchNavigator: LaunchNavigator ){
    this.msg="";
  }
  
  sendSMS(){
     this.geolocation.getCurrentPosition().then((resp) => {
        this.lat=resp.coords.latitude;
        this.lang=resp.coords.longitude;
        this.msg="DANGER!!!Location:  http://maps.google.com/?ie=UTF8&hq=&ll="+this.lat+","+this.lang+"&z=13";
        console.log(this.msg);
        }).catch((error) => {
         //console.log('Error getting location', error);
         alert('Error getting location');
       });
      this.msg="DANGER!!!Location:  http://maps.google.com/?ie=UTF8&hq=&ll="+this.lat+","+this.lang+"&z=13";
        this.smsVar.send('9207578743',this.msg)
        .then(()=>{
          alert("Panic Alert Send!!!");
          
       
        },()=>{
          alert("Failed to send panic alert");
      });
  }
  callnumber(){
    this.callNumber.callNumber("9207578743", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  navigatemap(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.lang=resp.coords.longitude;
      this.loc=this.lat+","+this.lang;
    }).catch((error) => {
      //console.log('Error getting location', error);
      alert('Error getting location');

    });
    this.launchNavigator.navigate("Nearest Police Station", {
      start: this.loc
  });
  }
}
