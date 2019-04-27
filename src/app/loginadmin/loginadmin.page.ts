import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router'; 



@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.page.html',
  styleUrls: ['./loginadmin.page.scss'],
})
export class LoginadminPage implements OnInit {

  constructor(public navCtrl: NavController,public router:Router) {
    
  }
 

  ngOnInit() {
  }
  logout(){
    this.navCtrl.navigateBack('/tabs/tab3');
  }
  

}
