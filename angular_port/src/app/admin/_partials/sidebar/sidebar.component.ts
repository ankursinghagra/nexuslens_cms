import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  inputs: ['eventData']
})
export class SidebarComponent implements OnInit{
  sidebarHidden = true;
  private eventsSubscription: Subscription|any;
  @Input() eventData: Observable<void>|any;
  

  ngOnInit(){
    this.eventsSubscription = this.eventData.subscribe(()=>{
      this.toggle();
    });
  }

  toggle() {
    console.log("final", this.sidebarHidden);
    this.sidebarHidden = !this.sidebarHidden;
  }
}
