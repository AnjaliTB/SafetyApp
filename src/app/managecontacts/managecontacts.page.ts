import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Router ,RouterEvent, ActivatedRoute} from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { ContactsService,Contact } from "../contacts.service";

@Component({
  selector: 'app-managecontacts',
  templateUrl: './managecontacts.page.html',
  styleUrls: ['./managecontacts.page.scss'],
})
export class ManagecontactsPage implements OnInit {

  contact: Contact = {
    userid:'XXXXXXXX',
    contactname: 'Anju',
    contactnumber:9207578743
    
  };
  
  userId:string;
  contacts: Contact[];
  result:any;

  constructor(
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private fireStore: AngularFirestore,
    private contactsService: ContactsService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.userId =this.route.snapshot.paramMap.get('id');
    this.result = this.afs.collection('contacts', ref =>
    ref.where('userid', '==', this.userId));
    this.contacts=this.result;
    //console.log(this.userId);
  }

  goback(){
    this.navCtrl.navigateBack('/loginuser/'+this.userId);
    }
    addContact(){
      this.contact.userid=this.userId;
      this.contactsService.addContact(this.contact).then(() => {
        alert('Contact added sucessfully');
      });
    }

}
