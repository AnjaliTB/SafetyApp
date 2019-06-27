import {AfterViewInit, Component, ViewChild,ElementRef,NgZone,OnInit} from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs/Subscription';

import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Geofence } from '@ionic-native/geofence/ngx';
import { Googlemaps } from '../googlemaps.service';


declare var google;

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  @ViewChild('map') googleMap;
  mapElement: any;
  map: any;
  mapOptions: any;
  //mapCenter = {lat:null , lng:null};
  
  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any; 
  
  mapCenter = {lat:10.8551069 , lng:76.277977};
  markerOptions: any = {position: null, map: null, title: null};
  marker: any;
  
  ngOnInit(){}


constructor(//public zone: NgZone,
  //private maps:Googlemaps,
  private geolocation: Geolocation, 
  private geofence: Geofence, 
  private platform: Platform) {
}



ngAfterViewInit(): void {

 

}




initMap() {
  var sydney = new google.maps.LatLng(-33.867, 151.195);

  //this.infowindow = new google.maps.InfoWindow();

  this.map = new google.maps.Map(
      document.getElementById('map'), {center: sydney, zoom: 15});

  var request = {
    query: 'Museum of Contemporary Art Australia',
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(this.map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        //createMarker(results[i]);
        /*this.markerOptions.position = new google.maps.LatLng(this.mapCenter.lat, this.mapCenter.lng);
        this.markerOptions.map = this.map;
        this.markerOptions.title = 'My Location';
        this.marker = new google.maps.Marker(this.markerOptions);*/
        console.log(results[i]);
      }
      this.map.setCenter(results[0].geometry.location);
    }
  });
}

}
