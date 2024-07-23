import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../../_services/admindata.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.scss'
})
export class UsersEditComponent implements OnInit {
  admin_id : string|null = null;
  admin_userdata : {admin_name:string,admin_email:string,admin_group:number} = {admin_name: '', admin_email: '', admin_group: 0};
  constructor(private bs:AdminDataService, private route: ActivatedRoute){
    this.admin_id= this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.bs.setHeaderBreadcrums([
      {title: 'dashboard',link: '/admin'},
      {title: 'Users',link: '/admin/users'},
      {title: 'Edit User',link: '/admin/users/edit/'+this.admin_id},
    ]);
    this.bs.getUserData(this.admin_id).subscribe({
      next: (res)=>{
        console.log(res);
        if(res.status){
          this.admin_userdata = res.user_data;
        }
      },
      error: (error)=>{
        
      }
    });
  }  
}
