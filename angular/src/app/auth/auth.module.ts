import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';

const authRoutes:Routes = [
  {path: "", redirectTo: 'login', pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "forget", component: ForgetComponent},
];

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ForgetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
  ]
})
export class AuthModule { }
