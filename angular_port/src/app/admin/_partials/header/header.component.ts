import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

declare var localStorage: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  outputs: ['sidebarToggle']
})
export class HeaderComponent {

  darkMode = true;

  @Output() sidebarToggle = new EventEmitter<Event>();

  constructor(@Inject(DOCUMENT) private document: Document){
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
