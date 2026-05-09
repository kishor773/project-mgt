import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsService } from '../../../core/services/api/organizations.service';
import { Organization } from '../../../core/models/core.models';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';

@Component({
  selector: 'app-organizations-list',
  standalone: true,
  imports: [CommonModule, OrganizationFormComponent],
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationsListComponent implements OnInit {
  organizations: Organization[] = [];
  loading = true;
  showModal = false;

  constructor(private organizationsService: OrganizationsService) {}

  ngOnInit() {
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.organizationsService.findAll().subscribe({
      next: (data) => {
        // Adding mock members for UI purposes if backend doesn't provide it yet
        this.organizations = data.map(org => ({...org, members: Math.floor(Math.random() * 20) + 1, status: 'Active'}));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching organizations', error);
        this.loading = false;
      }
    });
  }
}
