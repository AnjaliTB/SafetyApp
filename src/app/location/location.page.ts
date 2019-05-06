import { NavController,Platform, ViewController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Googlemaps } from '../googlemaps.service';
declare var google;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
    
    ngOnInit() {
    }


}
