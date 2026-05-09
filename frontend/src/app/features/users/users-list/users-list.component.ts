import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/api/users.service';
import { User } from '../../../core/models/core.models';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading = true;
  showModal = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.findAll().subscribe({
      next: (data) => {
        // Adding mock roles if not returned by base user API
        this.users = data.map(user => ({...user, role: 'Developer'}));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching users', error);
        this.loading = false;
      }
    });
  }
}
