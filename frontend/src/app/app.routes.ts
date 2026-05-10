import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'organizations',
        loadComponent: () =>
          import('./features/organizations/organizations-list/organizations-list.component').then(
            m => m.OrganizationsListComponent
          )
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users-list/users-list.component').then(
            m => m.UsersListComponent
          )
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/projects-list/projects-list.component').then(
            m => m.ProjectsListComponent
          )
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./features/tasks/tasks-list/tasks-list.component').then(
            m => m.TasksListComponent
          )
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
