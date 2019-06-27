import { Component, OnInit } from '@angular/core';
import { Place, PlacesService } from "../places.service";
import { AuthenticationService } from "../authentication.service";
import { FirebaseService, User } from "../firebase.service";
import { Router ,RouterEvent, ActivatedRoute} from '@angular/router';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  place: Place = {
    name: 'Viyyur',
    latitude: 10.554244 ,
    longitude: 76.2164669,
    score: 5,
    userid:'XXXXXXXXXXXXXXXX',
    
  };
 
    
    selectedPath = '';
    userId:string;
    places:Place[];
    locate:Place;


    location: string;
    
    
    lighting:string;
    crowd:string;
    publictransport:string;
    security:string;
    feeling:string;
    num:number;

    address:any;
    latitude:number;
    longitude:number;
    rating:number;
    lat:number;
    lang:number;

    flag:boolean;
   
    constructor(
      private placesService:PlacesService,
      private auth: AuthenticationService,
      public navCtrl: NavController,
      private router: Router,
      private route: ActivatedRoute,
      private geolocation:Geolocation, 
      private firebaseService: FirebaseService){
        
      }

  ngOnInit() {
    this.userId =this.route.snapshot.paramMap.get('id');
    console.log(this.userId);
    this.placesService.getPlaces().subscribe(res => {
      this.places = res;
    });
     this.rating=7;
     if(this.userId==""){
      this.navCtrl.navigateRoot('/tabs/tab3');
     }
  }
  goback(){
    //this.router.navigateByUrl('/loginuser');
    if(this.userId=='admin'){
      this.navCtrl.navigateBack('/loginadmin/'+this.userId);
    }else{
      this.navCtrl.navigateBack('/loginuser/'+this.userId);
    }
    
  }

  rateLocation(){
    //this.num=parseInt(this.lighting);
    //console.log(this.num);
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.lang=resp.coords.longitude;
    }).catch((error) => {
      //console.log('Error getting location', error);
      alert('Error getting location');

    });
    console.log(this.lat);
    console.log(this.lang);
    this.rating=parseInt(this.lighting)+parseInt(this.crowd)+parseInt(this.publictransport)+parseInt(this.security)+parseInt(this.feeling);
    //console.log(this.rating+"rating");
    for (let loc of this.places){
      if(this.place.latitude==loc.latitude && this.place.longitude== loc.longitude&& this.userId==loc.userid){
        this.flag=true;
        this.locate=loc;
        break;
        
      }else{
        this.flag=false;
        
      }
    } 
      this.rating=7;
    //console.log(this.flag);
    if(this.flag==true){
        this.rating=7;
        this.place.latitude=this.locate.latitude
        this.place.longitude=this.locate.longitude
        this.place.score=this.rating;
        this.place.userid=this.userId
        //console.log(this.place.score);
        this.placesService.updateScore(this.place,this.locate.id).then(() => {
            //this.nav.navigateBack('tabs/tab3')
            alert('User feedback updated');
        });
    }else{
       
        this.place.score=this.rating;
        this.place.userid=this.userId;
        this.place.latitude=this.lat;
        this.place.longitude=this.lang;
        this.placesService.addPlace(this.place).then(() => {
            //this.nav.navigateBack('tabs/tab3')
            alert('User feedback saved');
        });
    }

    this.location="";
  }

}
