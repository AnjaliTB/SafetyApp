import { Component } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, LoadingController } from '@ionic/angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Sim } from "@ionic-native/sim/ngx";
//import {Observable} from 'rxjs/Rx';
//import 'rxjs/add/observable/interval';
import { AlertController } from '@ionic/angular';


import { User, FirebaseService } from '../firebase.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { TrackService,TrackUser } from "../track.service";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  victim: TrackUser = {
   
    phnumber: 1234567890,
    userid:'XXXXXXXXXX',
    latitude:10.66,
    longitude:76.66,
    locationurl:'http://maps.google.com/?ie=UTF8&hq=&ll=10.8505159,76.2710833&z=15',
    //date:new Date().getDate(),
    date: new Date().getDate(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes()
    
    
  };

  lat:number;
  lang:number;
  msg:string;
  loc:string;
  number:number;
  track:boolean;

  users:User[];
  user:User;
  userId:string;
  //victim:TrackUser;
  sub:any;
  date:any;
  

  constructor(private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private firebaseService: FirebaseService,
    private smsVar: SMS,
    private callNumber: CallNumber, 
    private geolocation:Geolocation, 
    public navCtrl: NavController, 
    private launchNavigator: LaunchNavigator,
    private afs: AngularFirestore,
    private sim: Sim,
    private trackService:TrackService ){
      this.firebaseService.getUsers().subscribe(res => {
        this.users = res;
      });

   
  }
  ngOnInit(){
    this.track=true;
  }
  ngOnDestroy(){
    this.track=false;
  }
  
  sendSMS(){
    this.date=new Date().getDate();

    console.log(this.date);
    this.date= new Date().getHours();
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
      setTimeout(() => {
        this.callnumber();
        }, 12000);
      
  }
  callnumber(){
    console.log('Calling');
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

  siminfo(){
    
    this.presentPrompt();
   
      setTimeout(() => {
        if(this.track){
          console.log(this.track);
          this.redirect();
        }
       
       }, 10000);
      
    }
    redirect(){
      this.track=true;
      this.userId="";
      //this.number=1234567891;
      this.firebaseService.getUsers().subscribe(res => {
        this.users = res;
      });
      console.log("redirecting"+this.number)
      for(let user of this.users){
        if(user.phnumber==this.number){
          this.userId=user.id;
          
        }
      }
      if(this.userId!==""){
        console.log(this.userId);
        this.addVictimLocation(this.number,this.userId);
      }else{
        alert('Unregistered User');
        this.userId='Unknown';
        this.addVictimLocation(this.number,this.userId);
      }
    }
      addVictimLocation(phnumber,userid){
        this.victim.phnumber=phnumber;
        this.victim.userid=userid;
        this.geolocation.getCurrentPosition().then((resp) => {
        this.lat=resp.coords.latitude;
        this.lang=resp.coords.longitude;
        this.victim.latitude=this.lat;
        this.victim.longitude=this.lang;
        this.victim.locationurl="http://maps.google.com/?ie=UTF8&hq=&ll="+this.lat+","+this.lang+"&z=15";
        this.trackService.addUser(this.victim).then(() => {
          alert('Location added');
        });
        }).catch((error) => {
          //console.log('Error getting location', error);
          alert('Error getting location');
    
        });
        setTimeout(() => {
          if(this.track){
            console.log(this.track);
            this.addVictimLocation(this.number,this.userId);
          }
         
         }, 10000);
      }
      stop(){
        this.track=false;
      }



      async presentPrompt() {
        const alert = await this.alertCtrl.create({
          inputs: [
            {
              name: 'phonenumber',
              placeholder: 'Enter PhoneNumber'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
               
              }
            },
            {
              text: 'OK',
              handler: data => {
                console.log('OK clicked');
                console.log(data.phonenumber);
                this.number=data.phonenumber;
              }
            }
          ]
        });
        await alert.present();
      }
}

