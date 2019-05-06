import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadimg',
  templateUrl: './uploadimg.page.html',
  styleUrls: ['./uploadimg.page.scss'],
})
export class UploadimgPage implements OnInit {
  imageURL:string;
  desc:string;
  busy:boolean = false;

  @ViewChild('filebutton') fileBUtton
  constructor(
  ) { }

  ngOnInit() {
  }

  
}
