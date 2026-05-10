import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';
import { Organization } from '../../models/core.models';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService extends CrudService<Organization> {
  constructor(protected override http: HttpClient) {
    super(http, 'organizations');
  }
}
