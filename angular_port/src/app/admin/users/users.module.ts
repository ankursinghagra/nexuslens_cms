import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersGroupsComponent } from './users-groups/users-groups.component';
import { UsersPermissionsComponent } from './users-permissions/users-permissions.component';
import { Routes, RouterModule } from '@angular/router';
import { UsersEditComponent } from './users-edit/users-edit.component';

const usersRoutes: Routes = [
  { path: '', component: UsersComponent, children: [
    {path: '', component: UsersListComponent},
    {path: 'add', component: UsersAddComponent},
    {path: 'edit/:id', component: UsersEditComponent},
    {path: 'groups', component: UsersGroupsComponent},
    {path: 'permissions', component: UsersPermissionsComponent},
  ]},
]

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersAddComponent,
    UsersGroupsComponent,
    UsersPermissionsComponent,
    UsersEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes)
  ]
})
export class UsersModule { }
