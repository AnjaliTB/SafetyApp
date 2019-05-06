import { Component, OnInit } from '@angular/core';
import { User, FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {


  users: User[];
 
  constructor(private firebaseService: FirebaseService) { }
 
  ngOnInit() {
    this.firebaseService.getUsers().subscribe(res => {
      this.users = res;
    });
  }
 
  remove(item) {
    this.firebaseService.removeUser(item.id);
  }

}
