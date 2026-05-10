import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrganizationsService } from '../../../core/services/api/organizations.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-organization-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css']
})
export class OrganizationFormComponent {
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  orgForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationsService
  ) {
    this.orgForm = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      logo_url: ['']
    });
  }

  onSubmit() {
    if (this.orgForm.invalid) return;
    
    this.isSubmitting = true;
    this.orgService.create(this.orgForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.saved.emit();
      },
      error: (err: any) => {
        console.error('Failed to create organization', err);
        this.isSubmitting = false;
      }
    });
  }
}
