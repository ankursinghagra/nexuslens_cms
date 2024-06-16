import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const authRoutes: Routes = [
  {path : "", component: LoginComponent},
  {path : "forget-password", component: ForgetPasswordComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes)
  ]
})
export class AuthModule { }
