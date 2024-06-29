import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../../_services/admindata.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  loading = true;
  results : Array<{
      admin_id: number,
      admin_email: string,
      admin_password: string,
      admin_name: string,
      admin_photo: string,
      admin_hash_for_email_verification: string,
      admin_hash_for_password_reset: string,
      admin_remember_me_token: string,
      admin_group: number,
      author_name: string,
      author_short_description: string,
      author_facebook_link: string,
      author_twitter_link: string,
      admin_email_verified: number
  }>= [];
  constructor(private bs: AdminDataService){

  }

  ngOnInit(){
    this.bs.getAllUsers().subscribe(res =>{
      console.log(res);
      this.results = res;
      this.loading = false;
    });
  }

}
