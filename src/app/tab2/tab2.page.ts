import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs/Subscription';

import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Geofence } from '@ionic-native/geofence/ngx';


declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit {

    @ViewChild('map') googleMap;
    mapElement: any;
    map: any;
    mapOptions: any;
    //lat: any;
    //lng: any;
    //mapCenter = {lat:null , lng:null};

    searchQuery: any;
    
    mapCenter = {lat:10.5551069 , lng:76.217977};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
  constructor(private geolocation: Geolocation, private geofence: Geofence, private platform: Platform) {
      
      this.geolocation.getCurrentPosition().then((resp) => {
        this.mapCenter.lat = resp.coords.latitude;
        this.mapCenter.lng = resp.coords.longitude;
        console.log(this.mapCenter.lat);
        console.log(this.mapCenter.lng);
      }).catch((error) => {
          console.log('Error getting location', error);
      });


      geofence.initialize().then(
        // resolved promise does not return a value
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
        )
    
        platform.ready().then(() => {
          this.notify();
        });
  }

  ngAfterViewInit(): void {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;
      console.log(this.mapCenter.lat);
      console.log(this.mapCenter.lng);
      //this.lat= resp.coords.latitude;
      //this.lng = resp.coords.longitude;
        // resp.coords.latitude
        // resp.coords.longitude
    }).catch((error) => {
        console.log('Error getting location', error);
    });
      this.mapElement = this.googleMap.nativeElement;
      this.mapOptions = {
          center: this.mapCenter,
          //center: (this.lat, this.lng),
          zoom: 8
      };

      setTimeout(() => {
          this.map = new google.maps.Map(this.mapElement, this.mapOptions);
          console.log(this.mapCenter.lat);
          console.log(this.mapCenter.lng);
          this.markerOptions.position = new google.maps.LatLng(this.mapCenter.lat, this.mapCenter.lng);
          //this.markerOptions.position = new google.maps.LatLng(this.lat, this.lng);
          this.markerOptions.map = this.map;
          this.markerOptions.title = 'My Location';
          this.marker = new google.maps.Marker(this.markerOptions);

      }, 100);

  }

  private addGeofence() {
    let fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748aaaa', //any unique ID
      latitude:       10.8505159, //center of geofence radius
      longitude:      76.2710833,
      radius:         100, //radius to edge of geofence in meters
      transitionType: 3, //see 'Transition Types' below
      notification: { //notification settings
          id:             1, //any unique ID
          title:          'You crossed a fence', //notification title
          text:           'You just arrived College.', //notification body
          openAppOnClick: true //open app when notification is tapped
      }
    }

    this.geofence.addOrUpdate(fence).then(
       () => console.log('Geofence added'),
       (err) => console.log('Geofence failed to add')
     );
  }
  
  notify(){
    this.addGeofence(); 
  }

  SearchPlace(){
    console.log('search place');
    console.log(this.searchQuery);

  }
 

}  

  
 