import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../../_services/admindata.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrl: './users-add.component.scss'
})
export class UsersAddComponent implements OnInit {

  constructor(private bs: AdminDataService){

  }

  ngOnInit(): void {
    this.bs.setHeaderBreadcrums([
      {title: 'dashboard',link: '/admin'},
      {title: 'Users',link: '/admin/users'},
      {title: 'Add User',link: '/admin/users/add'},
    ]);
  }
}
