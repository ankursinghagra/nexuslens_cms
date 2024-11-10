import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

    @ViewChild('sidebarRef') sidebarRef!: Sidebar;
    sidebarVisible: boolean = false;

    menu_right_items: MenuItem[] | undefined;
    date: Date | undefined;
    constructor(private router: Router) {}


    closeCallback(e:any): void {
        this.sidebarRef.close(e);
    }

    ngOnInit() {
        this.menu_right_items = [
            {
                label: '',
                icon: 'pi pi-cog',
                items: [
                    {
                        label: 'Profile',
                        icon: 'pi pi-user',
                        command: () => {
                            this.router.navigate(['/profile']);
                        }
                    },
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                        command: () => {
                            this.router.navigate(['/settings']);
                        }
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            this.router.navigate(['/logout']);
                        }
                    },
                ]
            }
        ];
    }
}
