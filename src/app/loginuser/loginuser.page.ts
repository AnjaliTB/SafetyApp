import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.page.html',
  styleUrls: ['./loginuser.page.scss'],
})
export class LoginuserPage implements OnInit {
  constructor(public navCtrl: NavController,public router:Router) { }

  ngOnInit() {
    
  }
  logout(){
    this.navCtrl.navigateBack('/tabs/tab3');
  }

}
