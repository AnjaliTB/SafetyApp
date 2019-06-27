import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs/Subscription';

import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Geofence } from '@ionic-native/geofence/ngx';
import { MapType } from '@angular/compiler';


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
    service: any;
    
    mapCenter = {lat:10.8505159 , lng:76.2710833};
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


     /* geofence.initialize().then(
        // resolved promise does not return a value
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
        )
    
        platform.ready().then(() => {
          this.notify();
        });*/

        // initialize the plugin
      // initialize the plugin
      geofence.initialize().then(
        // resolved promise does not return a value
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      )
  }

  private addGeofence() {
    //options describing geofence
    this.geolocation.getCurrentPosition().then((resp) => {
      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;
    }).catch((error) => {
        console.log('Error getting location', error);
    });
    let fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      latitude:       this.mapCenter.lat, //center of geofence radius
      longitude:      this.mapCenter.lng,
      radius:         500, //radius to edge of geofence in meters
      transitionType: 3, 
      notification: { //notification settings
          id:             1, //any unique ID
          title:          'You crossed a fence', //notification title
          text:           'You just arrived to an unsafe place.', //notification body
          openAppOnClick: true //open app when notification is tapped
      }
    }
  
    this.geofence.addOrUpdate(fence).then(
       () => alert('Geofence added'),//console.log('Geofence added'),
       (err) => alert('Geofence failed to add')//console.log('Geofence failed to add')
     );

     /*this.geofence.onTransitionReceived(fence).then(
      () =>console.log('Geofence transition received'),
      (err) => console.log('Geofence failed ')
    );*/

  }

  ngAfterViewInit(): void {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;
      console.log("After view init");
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
          this.markerOptions.map = this.map;
          this.markerOptions.title = 'My Location';
          this.marker = new google.maps.Marker(this.markerOptions);
          //console.log(this.marker)

      }, 100);

  }



  searchPlace(){
    console.log('search place');
    console.log(this.searchQuery);
   // this.map = new google.maps.Map(this.mapElement, this.mapOptions);

   var request = {
    query: 'College',
    fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
    };
    this.service = new google.maps.places.PlacesService(this.map);
    console.log(this.service);
    this.service.findPlaceFromQuery(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          this.createMarker(results[i]);
          /*var marker = new google.maps.Marker({
            position: results[i],
            map: this.map,
            title:"McDonalds"
          });
          marker.setMap(this.map);*/
        }
      }
    }

  }
  createMarker(place){
    var placeLoc = place.geometry.location;
      this.map.addMarker({
        position: place.geometry.location,
        title: "Hello GoogleMap for Cordova!",
        animation: google.maps.Animation.DROP,
      }, function(marker) {
        marker.setMap(this.map);
        marker.showInfoWindow();
      });
  }

  track(){
    this.addGeofence();
  }
 

}  