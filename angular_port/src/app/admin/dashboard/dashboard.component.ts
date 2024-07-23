import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../_services/admindata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private bs: AdminDataService){

  }

  ngOnInit(){
    this.bs.setHeaderBreadcrums([
      {title: 'dashboard',link: '/admin'}
    ]);
  }

}
