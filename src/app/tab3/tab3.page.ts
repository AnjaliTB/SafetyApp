import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { AuthenticationService } from "../authentication.service";



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  username:String;
  password:String;
  constructor(public navCtrl: NavController ,private router:Router, private auth: AuthenticationService){}
  loging(){
    console.log("Username"+this.username);
    console.log("Password"+this.password);
    if(this.username=='anju' && this.password=='anju'){
      console.log("User Logged in");
      this.auth.setLoggedIn(true)
      this.router.navigateByUrl('/loginuser');
    }
    else
      console.log("Login unsuccessful");
  
  }

}
