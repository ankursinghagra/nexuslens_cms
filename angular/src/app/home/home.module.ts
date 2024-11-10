import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';

const homeRoutes: Routes = [
  {path: "", redirectTo: 'dashboard', pathMatch: "full"},
  {path: "dashboard", component: HomeComponent},
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    ButtonModule,
    MenubarModule,
    CalendarModule,
    FormsModule,
    MenuModule,
    SidebarModule,
    AvatarModule,
    StyleClassModule
  ]
})
export class HomeModule { }
