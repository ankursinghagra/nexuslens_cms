import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../../_services/admindata.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.scss'
})
export class UsersEditComponent implements OnInit {
  admin_id : number = 0;
  constructor(private bs:AdminDataService){

  }

  ngOnInit(): void {
    this.bs.getUserData(this.admin_id).subscribe({
      next: (res)=>{

      },
      error: (error)=>{
        
      }
    });
  }  
}
