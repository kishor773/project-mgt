import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../core/services/api/users.service';
import { OrganizationsService } from '../../../core/services/api/organizations.service';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { RolesService } from '../../../core/services/api/roles.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectModule, InputTextModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['../../organizations/organization-form/organization-form.component.css'] // Reusing modal styles
})
export class UserFormComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  userForm: FormGroup;
  isSubmitting = false;
  organizations: any[] = [];
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private orgService: OrganizationsService,
    private rolesService: RolesService
  ) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      organization_id: ['', Validators.required],
      role_id: ['', Validators.required],
      password_hash: ['temp_password_123', Validators.required] // Temporary for mocking
    });
  }

  ngOnInit() {
    this.orgService.findAll().subscribe((orgs: any[]) => {
      this.organizations = orgs;
    });
    this.rolesService.findAll().subscribe((roles: any[]) => {
      this.roles = roles;
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    this.isSubmitting = true;

    // Ensure organization_id is a number (HTML select returns string)
    const payload = {
      ...this.userForm.value,
      organization_id: Number(this.userForm.value.organization_id)
    };

    // In a real app, backend would handle hashing and sending an invite email
    this.usersService.create(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.saved.emit();
      },
      error: (err: any) => {
        console.error('Failed to create user', err);
        this.isSubmitting = false;
      }
    });
  }
}
