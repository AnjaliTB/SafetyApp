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
  user : any;
  length : number;
  status: boolean;

  username: string ="";
  password: string ="";



  constructor(private firebaseService: FirebaseService, 
    public navCtrl: NavController ,
    private router:Router, 
    private auth: AuthenticationService,
    private route: ActivatedRoute,  
    private loadingController: LoadingController,
    private afs: AngularFirestore){
      this.status= this.auth.isAuthenticated();
      console.log(this.status)
    
  }
 
  ngOnInit() {
      this.firebaseService.getUsers().subscribe(res => {
      this.users = res;
      for (let i of this.users) {
        console.log(i); // "4", "5", "6"
      }
      });
  }
  

  loging(){
    for (let i of this.users) {
        console.log(i); // "4", "5", "6
        console.log("Username"+this.username);
        console.log("Password"+this.password);
        if(this.username==i.username && this.password==i.password){
          console.log("User Logged in");
          //alert("Welcome "+i.name+" !");
          this.auth.setLoggedIn(true)
          this.router.navigateByUrl('/loginuser');
        }else if (this.username=='admin' && this.password=='admin'){
          console.log("User Logged in");
          //alert("Welcome Admin !");
          this.auth.setLoggedIn(true)
          this.router.navigateByUrl('/loginadmin');
        }
        else
          console.log("Login unsuccessful");
          //alert("Login Unsucessful !!!");
      }

    /*this.user = this.afs.collection('users', (ref) => ref.where('username', '==', this.username).limit(1)).valueChanges();
    this.user.subscribe((user) => {
      console.log(user);
      console.log("User Logged in");
      this.auth.setLoggedIn(true)
      this.router.navigateByUrl('/loginuser');
     },
     (err) => console.log('Login failed'));*/

     /*this.user = this.afs.collection('users', 
  (ref) => {
    return ref.where('username', '==', this.username).limit(1)
  })
  .snapshotChanges()
  .map((users) => {
    return users.length
  });*/
  /*}catch(err){
    console.dir(err)
  }*/
}

}