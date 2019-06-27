import { Component, OnInit } from '@angular/core';
import { User, FirebaseService } from '../firebase.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  user: User = {
    name: 'Name',
    username: 'Username',
    password: 'xxxx',
    phnumber: 1234567890,
    status: false,
    
    
  };
 
  userId = null;
 
  constructor(private route: ActivatedRoute, 
    private nav: NavController, 
    private firebaseService: FirebaseService, 
    private loadingController: LoadingController) { }
 
  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId)  {
      this.loadUser();
    }
  }
 
  async loadUser() {
    const loading = await this.loadingController.create({
      message: 'Loading User..'
    });
    await loading.present();
 
    this.firebaseService.getUser(this.userId).subscribe(res => {
      loading.dismiss();
      this.user = res;
    });
  }
  async saveUser() {
 
    const loading = await this.loadingController.create({
      message: 'Saving User..'
    });
    await loading.present();
 
    if (this.userId) {
      this.firebaseService.updateUser(this.user, this.userId).then(() => {
        loading.dismiss();
        alert('User updated sucessfully');
        //this.nav.navigateBack('tabs/tab3')
      });
    } else {
      this.firebaseService.addUser(this.user).then(() => {
        loading.dismiss();
        //this.nav.navigateBack('tabs/tab3')
        alert('User created sucessfully');
      });
    }
  }
}
