import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrUpdateCompteComponent } from './create-or-update-compte/create-or-update-compte.component';
import { DetailCompteComponent } from './detail-compte/detail-compte.component';
import { ListeCompteComponent } from './liste-compte/liste-compte.component';

const routes: Routes = [
  { path: '',   redirectTo: 'liste-compte', pathMatch: 'full' },
  { path: 'liste-compte', component: ListeCompteComponent },
  { path: 'create-or-update-compte', component: CreateOrUpdateCompteComponent },
  { path: 'detail-compte', component: DetailCompteComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComptesRoutingModule { }
