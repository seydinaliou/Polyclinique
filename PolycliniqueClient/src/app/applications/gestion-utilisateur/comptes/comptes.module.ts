import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComptesRoutingModule } from './comptes-routing.module';
import { ListeCompteComponent } from './liste-compte/liste-compte.component';
import { DetailCompteComponent } from './detail-compte/detail-compte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { CreateOrUpdateCompteComponent } from './create-or-update-compte/create-or-update-compte.component';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';


const ListePage = [ListeCompteComponent,DetailCompteComponent,CreateOrUpdateCompteComponent]
@NgModule({
  declarations: [ListePage],
  imports: [
    CommonModule,
    ComptesRoutingModule,
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
  exports: ListePage,
})
export class ComptesModule { }
