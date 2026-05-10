import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class TaskLabelsService extends CrudService<any> {
  constructor(protected override http: HttpClient) {
    super(http, 'task-labels');
  }
}
