import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivilegesRoutingModule } from './privileges-routing.module';
import { ListePrivilegeComponent } from './liste-privilege/liste-privilege.component';
import { DetailPrivilegeComponent } from './detail-privilege/detail-privilege.component';
import { CreateOrUpdatePrivilegeComponent } from './create-or-update-privilege/create-or-update-privilege.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';

const privilegeComponent =[ListePrivilegeComponent,DetailPrivilegeComponent,CreateOrUpdatePrivilegeComponent]

@NgModule({
  declarations: [privilegeComponent],
  imports: [
    CommonModule,
    PrivilegesRoutingModule,
    MaterialModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    FurySharedModule,
    // Core
    ListModule,
    BreadcrumbsModule,
  ],
  exports: [privilegeComponent]
})
export class PrivilegesModule { }
