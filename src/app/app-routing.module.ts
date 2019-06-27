import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./auth-guard.service";

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'loginadmin/:id', loadChildren: './loginadmin/loginadmin.module#LoginadminPageModule' },
  { 
    path: 'loginuser/:id', 
    canActivate: [AuthGuardService],
    loadChildren: './loginuser/loginuser.module#LoginuserPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'uploadimg', loadChildren: './uploadimg/uploadimg.module#UploadimgPageModule' },
  { path: 'location/:id', loadChildren: './location/location.module#LocationPageModule' },
  { path: 'managecontacts/:id', loadChildren: './managecontacts/managecontacts.module#ManagecontactsPageModule' },
  { path: 'addcontact', loadChildren: './addcontact/addcontact.module#AddcontactPageModule' },
  { path: 'feedback/:id', loadChildren: './feedback/feedback.module#FeedbackPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
