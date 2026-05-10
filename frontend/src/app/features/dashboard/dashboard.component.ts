import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  stats = [
    { label: 'Active Projects', value: '12', icon: 'pi pi-briefcase', color: '#4f46e5' },
    { label: 'Pending Tasks', value: '48', icon: 'pi pi-check-square', color: '#ef4444' },
    { label: 'Team Members', value: '24', icon: 'pi pi-users', color: '#10b981' },
    { label: 'Organizations', value: '3', icon: 'pi pi-building', color: '#f59e0b' }
  ];
}
