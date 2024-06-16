import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  event : any;
  sidebarHidden = true;
  sidebarToggleEvent2 = new EventEmitter<any>();

  @Input()
  set event2(event3: Event){
    console.log(event3);
    
    // if (event) {
    //   this.toggle();
    // }
  }
  constructor(){

  }
  onChange(sidebarToggleEvent: Event) {
    console.log("event reached admin component", sidebarToggleEvent);
    this.sidebarToggleEvent2.emit(1);
    this.sidebarHidden = !this.sidebarHidden;
  }
}
