const fs = require('fs');
const path = require('path');

const modules = [
  'activity-logs', 'attachments', 'board-columns', 'comments', 
  'labels', 'milestones', 'notifications', 'project-members', 
  'projects', 'roles', 'sprints', 'task-dependencies', 
  'task-labels', 'tasks', 'time-logs', 'user-roles'
];

const servicesDir = path.join(__dirname, 'src', 'app', 'core', 'services', 'api');

if (!fs.existsSync(servicesDir)) {
  fs.mkdirSync(servicesDir, { recursive: true });
}

modules.forEach(moduleName => {
  const className = moduleName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') + 'Service';
    
  const fileName = `${moduleName}.service.ts`;
  
  const content = `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ${className} extends CrudService<any> {
  constructor(protected override http: HttpClient) {
    super(http, '${moduleName}');
  }
}
`;

  fs.writeFileSync(path.join(servicesDir, fileName), content);
  console.log(`Generated ${fileName}`);
});
