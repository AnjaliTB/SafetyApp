import { Component, OnInit } from '@angular/core';
import { Place, PlacesService } from "../places.service";
import { Router ,RouterEvent, ActivatedRoute} from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  place: Place = {
    name: 'Edathirinji',
    latitude: 10.855 ,
    longitude: 76.22,
    score: 5,
    userid:'XXXXXXXXXXXXXXXX',
    
  };

    selectedPath = '';
    userId:string;
    places:Place[];
    locate:Place;

  constructor(
    private placesService:PlacesService,
    public navCtrl: NavController,
    private route: ActivatedRoute,
  ) { 
    this.placesService.getPlaces().subscribe(res => {
      this.places = res;
     });
  }

  ngOnInit() {
    this.userId =this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(): void {
    this.placesService.getPlaces().subscribe(res => {
      this.places = res;
      
    });
    this.userId ='admin' ;
    console.log('AfterView Init')
    console.log(this.userId);
   }
  goback(){
    this.navCtrl.navigateBack('/loginadmin/'+this.userId);
  }

}
