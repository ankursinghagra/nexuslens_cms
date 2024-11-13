import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetComponent } from './forget/forget.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';

import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiAppearance, TuiIcon, TuiTextfieldComponent } from '@taiga-ui/core';
import { TuiCopy, TuiPassword } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

const authRoutes: Routes = [
  {path: "", component: AuthComponent , children: [
    {path : "", component: LoginComponent},
    {path : "forget-password", component: ForgetComponent}
  ]},
];

@NgModule({
  declarations: [
    ForgetComponent,
    LoginComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    TuiInputModule,
    ReactiveFormsModule,
    TuiIcon,
    TuiCopy,
    TuiPassword,
    TuiTextfieldComponent,
    TuiAppearance,
  ]
})
export class AuthModule { }
