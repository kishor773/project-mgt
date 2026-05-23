import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsService } from '../../../core/services/api/organizations.service';
import { Organization } from '../../../core/models/core.models';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-organizations-list',
  standalone: true,
  imports: [CommonModule, OrganizationFormComponent, ButtonModule, DialogModule, InputTextModule, TableModule, TagModule],
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.css']
})
export class OrganizationsListComponent implements OnInit {
  organizations: Organization[] = [];
  loading = true;
  showModal = false;
  visible: boolean = false;
  editOrgVisible: boolean = false;
  selectedOrganization: Organization | null = null;
  constructor(
    private organizationsService: OrganizationsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadOrganizations();
  }

  showDialog() {
    this.visible = true;
  }

  loadOrganizations() {
    this.organizationsService.findAll().subscribe({
      next: (data) => {
        this.organizations = data
        // .map(org => ({
        //   ...org,
        //   members: Math.floor(Math.random() * 20) + 1,
        //   status: 'Active'
        // }));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching organizations', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  viewEditOrg(org: Organization) {
    this.selectedOrganization = org;
    this.editOrgVisible = true;
  }
}
