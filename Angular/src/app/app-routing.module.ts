import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentNewFormComponent } from './student-new-form/student-new-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { RoleGuardService } from './role-guard.service';


const routes: Routes = [
  { 
    path:'', 
    component: MainViewComponent, 
    canActivate: [AuthGuardService]
  },
  { 
    path:'login',
    component: LoginComponent
  },
  { 
    path:'new-student',
    component: StudentNewFormComponent, 
    canActivate: [RoleGuardService], 
    data: { 
      expectedRole: 'admin'
    } 
  },
  { 
    path:'student/:id',
    component: StudentDetailsComponent, 
    canActivate: [AuthGuardService]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
