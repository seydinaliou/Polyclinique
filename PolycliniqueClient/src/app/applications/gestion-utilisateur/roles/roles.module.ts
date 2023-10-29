import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { ListeRoleComponent } from './liste-role/liste-role.component';
import { DetailRoleComponent } from './detail-role/detail-role.component';
import { CreateOrUpdateRoleComponent } from './create-or-update-role/create-or-update-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { MatPaginatorModule } from '@angular/material/paginator';

const roleComponent = [ListeRoleComponent,DetailRoleComponent,CreateOrUpdateRoleComponent]
@NgModule({
  declarations: [roleComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
    FurySharedModule,
    MatPaginatorModule,
    MatPaginatorModule,
    // Core
    ListModule,
    BreadcrumbsModule,
  ], 
  exports: roleComponent
})
export class RolesModule { }
