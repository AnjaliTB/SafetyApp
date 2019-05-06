import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginuserPage } from './loginuser.page';

const routes: Routes = [
  {
    path: '',
    component: LoginuserPage,
   children: [
      /*{
        path: '',
        redirectTo:'/loginuser'
      },*/
      {
        path: 'location',
        loadChildren: '../location/location.module#LocationPageModule',
      },
      {
        path: 'logout',
        loadChildren: '../logout/logout.module#LogoutPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginuserPage]
})
export class LoginuserPageModule {

  
}
