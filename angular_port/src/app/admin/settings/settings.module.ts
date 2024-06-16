import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';

const settingsRoutes: Routes = [
  { path: '', component: SettingsComponent, children: [
    {path: '', component: GeneralComponent},
    {path: 'profile', component: ProfileComponent}
  ]},
]

@NgModule({
  declarations: [
    SettingsComponent,
    GeneralComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(settingsRoutes)
  ]
})
export class SettingsModule { }
