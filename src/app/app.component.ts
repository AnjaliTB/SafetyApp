import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  /*public appPages = [
    {
      title: 'Home',
      url: '/signup',
      icon: 'home'
    },
    {
      title: 'Location',
      url: '/location',
      icon: 'locate'
    }
  ];*/
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth : AuthenticationService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }
  logout() {
    this.auth.setLoggedIn(false);
    this.router.navigateByUrl("/");
  }
  }