import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './_partials/sidebar/sidebar.component';
import { HeaderComponent } from './_partials/header/header.component';
import { authGuard } from './_guards/auth.guard'
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './_services/common/common.service';

const adminRoutes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    canActivate: [],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      {path: 'settings', loadChildren: ()=> import('./settings/settings.module').then(m => m.SettingsModule) }
    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    HttpClientModule
  ],
  providers: [
    CommonService
  ]
})
export class AdminModule { }
