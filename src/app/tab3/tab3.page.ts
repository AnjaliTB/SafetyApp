import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from "../authentication.service";
import { User, FirebaseService } from '../firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'rxjs/add/operator/mergeMap';
import { AngularFirestore } from 'angularfire2/firestore';

import { map } from 'rxjs/operators';





@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  {
  
  users: User[];
  user: User;
  //user: any;
  length : number;
  status: boolean;
  person: number;
  username: string ="";
  password: string ="";
  userId: string = "";

  uname: string ="";
  pwd: string ="";



  constructor(private firebaseService: FirebaseService, 
    public navCtrl: NavController ,
    private router:Router, 
    private auth: AuthenticationService,
    private route: ActivatedRoute,  
    private loadingController: LoadingController,
    private afs: AngularFirestore){
      this.status= this.auth.isAuthenticated();
      //console.log(this.status)
    
  }
 
  ngOnInit() {
      this.firebaseService.getUsers().subscribe(res => {
      this.users = res;
      
      });
  }
  

  loging(){
    this.firebaseService.getUsers().subscribe(res => {
      this.users = res;
      
      });
       for (let user of this.users) {
        if (this.username=='admin' && this.password=='admin'){
          //console.log("Admin Logged in");
          this.userId='admin';
          this.person=1;
          this.auth.setLoggedIn(true)
          this.router.navigateByUrl('/loginadmin/'+this.userId);
        }else if(this.username==user.username && this.password==user.password){
          this.person=2;
          this.userId = user.id;
          console.log(this.userId)
          this.firebaseService.setLoggedIn(this.userId).then(() => {
            //console.log("User Logged in");
          });
         
          this.auth.setLoggedIn(true)
          this.router.navigateByUrl('/loginuser/'+this.userId);
        }
        else{
          //console.log("Login unsuccessful");
          //alert("Login Unsucessful !!!");
          this.person=0;
        }
      }

      if(this.person==0 && this.userId==''){
        alert("Incorrect username or password !!!");
      }

      this.username="";
      this.password="";
}

}