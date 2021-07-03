import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './guards/auth.guard';








const routes: Routes = [


{ path:"",
  component:LoginComponent,	
  pathMatch:"full"
},
{
	path:"home",
	component:HomeComponent,
  canActivate:[AuthGuard]
},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
