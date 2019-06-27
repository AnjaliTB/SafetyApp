import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router ,RouterEvent, ActivatedRoute} from '@angular/router'; 
import { Icon } from 'ionic-angular/umd';
import { AuthenticationService } from "../authentication.service";
import { FirebaseService, User } from "../firebase.service";

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.page.html',
  styleUrls: ['./loginuser.page.scss'],
})
export class LoginuserPage implements OnInit {
 

  
  status: boolean;
  selectedPath = '';
  userId:string;
  user:User;
 
  /*pages = [
    {
      title: 'Home',
      url: '/loginuser',
      icon: 'home'
    },
    {
      title: 'Location',
      url: '/location/'+this.userId,
      icon: 'locate'
    }
  ];*/
 
  constructor(private auth: AuthenticationService,
    public navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService) {
        
        this.userId =this.route.snapshot.paramMap.get('id');
        console.log(this.userId);
        this.firebaseService.getUser(this.userId).subscribe(res => {
          this.user = res;
        //alert("Welcome"+this.user.name);
        });
        /*if(!this.user){
          this.navCtrl.navigateBack('/tabs/tab3');
        }*/
        this.status= this.auth.isAuthenticated();
        if(this.status){  
          this.router.events.subscribe((event: RouterEvent) => {
          if (event && event.url) {
            this.selectedPath = event.url;
            }
          });
        }else{
        this.navCtrl.navigateBack('/tabs/tab3');
    }
    
  }

  ngOnInit() {
    this.userId =this.route.snapshot.paramMap.get('id');
        console.log(this.userId);
  }
  
  logout(){

      this.auth.setLoggedIn(false);
      this.status= this.auth.isAuthenticated();
      //console.log(this.status)
      this.firebaseService.setLoggedOut(this.userId).then(() => {
        console.log("User Logged out");
      });
      this.navCtrl.navigateRoot('/tabs/tab3');

  }

  goToLocation(){
    this.router.navigateByUrl('/location/'+this.userId);
  }

  manageContacts(){
    //this.userId='7zuePyFMIhWwXHnOzcep'
    this.router.navigateByUrl('/managecontacts/'+this.userId);

  }

}
