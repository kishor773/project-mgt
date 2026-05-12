import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/api/users.service';
import { User } from '../../../core/models/core.models';
import { UserFormComponent } from '../user-form/user-form.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent, DialogModule, ButtonModule, SelectModule, IconFieldModule, InputIconModule, MultiSelectModule, TableModule, TagModule, InputTextModule, FormsModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading = true;
  showModal = false;
  visible: boolean = false;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.findAll().subscribe({
      next: (data) => {
        // Adding mock roles if not returned by base user API
        this.loading = false;
        this.users = data.map(user => ({ ...user, role: 'Developer' }));
      },
      error: (error) => {
        console.error('Error fetching users', error);
        this.loading = false;
      }
    });
  }
}
