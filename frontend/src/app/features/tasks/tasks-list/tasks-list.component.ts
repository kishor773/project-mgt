import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container" style="padding: 2rem;">
      <div class="glass-panel" style="padding: 3rem; text-align: center; border-radius: var(--radius-lg);">
        <i class="pi pi-hammer" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
        <h2>Tasks Module Coming Soon</h2>
        <p style="color: var(--text-secondary);">The Tasks and Kanban board will be implemented in Phase 4.</p>
      </div>
    </div>
  `
})
export class TasksListComponent {}
