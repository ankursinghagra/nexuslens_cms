import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AdminDataService } from './_services/admindata.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit{
  event : any;
  sidebarHidden = true;
  loading = true;
  sidebarToggleEvent2 = new EventEmitter<any>();

  // @Input()
  // set event2(event3: Event){
  //   console.log(event3);
  // }
  constructor(private bs:AdminDataService){

  }

  ngOnInit(){
    this.bs.getAdminUser().subscribe((res) =>{
      console.log(res);
      this.loading = false;
    });
  }

  onChange(sidebarToggleEvent: Event) {
    console.log("event reached admin component", sidebarToggleEvent);
    this.sidebarToggleEvent2.emit(1);
    this.sidebarHidden = !this.sidebarHidden;
  }
}
