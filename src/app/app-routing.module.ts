import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./auth-guard.service";

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'loginadmin', loadChildren: './loginadmin/loginadmin.module#LoginadminPageModule' },
  { 
    path: 'loginuser', 
    canActivate: [AuthGuardService],
    loadChildren: './loginuser/loginuser.module#LoginuserPageModule' },
  { path: 'location', loadChildren: './location/location.module#LocationPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'uploadimg', loadChildren: './uploadimg/uploadimg.module#UploadimgPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
