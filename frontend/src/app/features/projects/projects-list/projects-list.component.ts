import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container" style="padding: 2rem;">
      <div class="glass-panel" style="padding: 3rem; text-align: center; border-radius: var(--radius-lg);">
        <i class="pi pi-briefcase" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
        <h2>Projects Module Coming Soon</h2>
        <p style="color: var(--text-secondary);">The Projects list and details will be implemented in Phase 3.</p>
      </div>
    </div>
  `
})
export class ProjectsListComponent {}
