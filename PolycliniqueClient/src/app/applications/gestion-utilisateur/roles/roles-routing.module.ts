import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrUpdateRoleComponent } from './create-or-update-role/create-or-update-role.component';
import { DetailRoleComponent } from './detail-role/detail-role.component';
import { ListeRoleComponent } from './liste-role/liste-role.component';

const routes: Routes = [
  { path: '', component: ListeRoleComponent },
  { path: 'liste-role', component: ListeRoleComponent },
  { path: 'create-or-update-role', component: CreateOrUpdateRoleComponent },
  { path: 'detail-role', component: DetailRoleComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
