import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrUpdatePrivilegeComponent } from './create-or-update-privilege/create-or-update-privilege.component';
import { DetailPrivilegeComponent } from './detail-privilege/detail-privilege.component';
import { ListePrivilegeComponent } from './liste-privilege/liste-privilege.component';

const routes: Routes = [
  { path: '', component: ListePrivilegeComponent },
  { path: 'liste-privilege', component: ListePrivilegeComponent },
  { path: 'create-or-update-privilege', component: CreateOrUpdatePrivilegeComponent},
  { path: 'detail-privilege', component: DetailPrivilegeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivilegesRoutingModule { }
