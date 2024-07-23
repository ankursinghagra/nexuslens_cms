import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AdminDataService } from '../../_services/admindata.service';

declare var localStorage: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  outputs: ['sidebarToggle']
})
export class HeaderComponent implements OnInit {

  darkMode = true;
  header_breadcrums: Array<{title:string,link:string}> = [];

  @Output() sidebarToggle = new EventEmitter<Event>();

  constructor(@Inject(DOCUMENT) private document: Document, private bs: AdminDataService){
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.getItem('theme') === 'dark' ) {
      document.documentElement.classList.add('dark')
      this.darkMode = true;
      localStorage.setItem('theme','dark')
    } else {
      document.documentElement.classList.remove('dark')
      this.darkMode = false;
      localStorage.setItem('theme','light')
    }
  }

  ngOnInit(){
     this.bs.header_breadcrums_change.subscribe(
      res => {
        this.header_breadcrums = res;
      }
     );
  }

  toggleSidebar(event: Event){
    console.log("toggleSidebar Called",event)
    this.sidebarToggle.emit(event);
  }

  toggleDarkMode(){
    this.darkMode = !this.darkMode;
    if(this.darkMode){
      this.document.documentElement.classList.add('dark');
      localStorage.setItem('theme','dark')
    }else{
      this.document.documentElement.classList.remove('dark');
      localStorage.setItem('theme','light')
    }
    console.log(this.darkMode);
    
  }

  
}
