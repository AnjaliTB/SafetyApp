import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router ,RouterEvent, ActivatedRoute} from '@angular/router'; 
import { Icon } from 'ionic-angular/umd';
import { AuthenticationService } from "../authentication.service";
import { FirebaseService, User } from "../firebase.service";
import { PlacesService, Place  } from "../places.service";



@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.page.html',
  styleUrls: ['./loginadmin.page.scss'],
})
export class LoginadminPage implements OnInit {
 

  
  status: boolean;
  selectedPath = '';
  userId:string;
  user:User[];
  places:any;
  show:boolean;
  message:string;
 
  constructor(private auth: AuthenticationService,
    public navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private placesService: PlacesService) {
        
       // console.log(this.userId);

        /*this.status= this.auth.isAuthenticated();
        if(this.status){  
          this.router.events.subscribe((event: RouterEvent) => {
          if (event && event.url) {
            this.selectedPath = event.url;
            }
          });
        }else{
        this.navCtrl.navigateBack('/tabs/tab3');
        }*/
        this.userId ='admin' ;
        //console.log(this.userId);
        this.message="No Places";
    
  }
  
 ngAfterViewInit(): void {
  this.placesService.getPlaces().subscribe(res => {
    this.places = res;
    
  });
  //console.log(this.places);
    
  this.userId ='admin' ;
  console.log('AfterView Init')
  console.log(this.userId);
  this.show=true;
  
  }

  ngOnInit() { 
   
    
  }

  
  logout(){
      this.show=false;

      this.auth.setLoggedIn(false);
      this.status= this.auth.isAuthenticated();
      /*console.log(this.status)
      this.firebaseService.setLoggedOut(this.userId).then(() => {
        console.log("User Logged out");
      });*/
      this.navCtrl.navigateRoot('/tabs/tab3');

  }
  approve(){
    alert('Feedback approved');
  }
  reject(id){
   console.log(id);
   this.placesService.removePlace(id).then(() => {
    //this.nav.navigateBack('tabs/tab3')
    alert('Feedback rejected');
  });
   //window.location.reload();
  }

  goToLocation(){
    this.router.navigateByUrl('/location/'+this.userId);
  }
  goToFeedback(){
    this.router.navigateByUrl('/feedback/'+this.userId);
  }
}
