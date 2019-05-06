import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router'; 
import { AuthenticationService } from "../authentication.service";



@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.page.html',
  styleUrls: ['./loginadmin.page.scss'],
})
export class LoginadminPage implements OnInit {
  ngOnInit() {
    
  }
  
  status: boolean;
  selectedPath = '';
 
  pages = [
    /*{
      title: 'Home',
      url: '/loginuser',
      icon: 'home'
    },*/
    {
      title: 'Location',
      url: '/loginuser/location',
      icon: 'locate'
    }
  ];
 
  constructor(private auth: AuthenticationService,
    public navCtrl: NavController,
    private router: Router) {
        this.status= this.auth.isAuthenticated();
      console.log(this.status)
      if(this.status){
          this.router.events.subscribe((event: RouterEvent) => {
          if (event && event.url) {
            this.selectedPath = event.url;
          }
        });
      }else
      {
        this.navCtrl.navigateBack('/tabs/tab3');
      }
}
  logout(){

      this.auth.setLoggedIn(false);
      this.status= this.auth.isAuthenticated();
      console.log(this.status)
      this.navCtrl.navigateRoot('/tabs/tab3');

  }
}
