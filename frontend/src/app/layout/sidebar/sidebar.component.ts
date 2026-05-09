import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Organizations', icon: 'pi pi-building', route: '/organizations' },
    { label: 'Users', icon: 'pi pi-users', route: '/users' },
    { label: 'Projects', icon: 'pi pi-briefcase', route: '/projects' },
    { label: 'My Tasks', icon: 'pi pi-check-square', route: '/tasks' }
  ];
}
