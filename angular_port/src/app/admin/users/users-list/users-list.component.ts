import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../../_services/admindata.service';
import { CommonService } from '../../../_services/common/common.service';

interface UsersModel {
  admin_id: number,
  admin_email: string,
  admin_password: string,
  admin_name: string,
  admin_photo: string,
  admin_hash_for_email_verification: string,
  admin_hash_for_password_reset: string,
  admin_remember_me_token: string,
  admin_group: number,
  admin_email_verified: number,
  group_color: string,
  group_name: string,
  modify_permissions: string,
  view_permissions: string
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  loading = true;
  results : Array<UsersModel>= [];
  constructor(private bs: AdminDataService, private cs: CommonService){

  }

  ngOnInit(){
    this.bs.getAllUsers().subscribe({
      next: res =>{
        console.log(res);
        this.results = res;
        this.loading = false;
      },
      error: err=>{
        
      }
    });
  }

}
