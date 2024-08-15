import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './SignInAndSingUp/auth/auth.component';
import { AuthGuard } from './services/guards/auth.guard';
import { SignupComponent } from './SignInAndSingUp/signup/signup.component';

const routes: Routes = [
  {path:'', redirectTo:'', pathMatch:'full'},
  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent, },
  {path:'login', component:AuthComponent },
  {path:'register', component:SignupComponent },
  { path: 'hotels', loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)  , canActivate: [AuthGuard]} ,
  { path: 'hotels/admin', loadChildren: () => import('./hotels/admin/admin.module').then(m => m.AdminModule) ,canActivate: [AuthGuard] },
  { path: 'myProfile', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
