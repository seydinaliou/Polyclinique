import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrUpdateListeAttenteComponent } from './create-or-update-liste-attente/create-or-update-liste-attente.component';
import { DetailListeAttenteComponent } from './detail-liste-attente/detail-liste-attente.component';
import { ListeAttenteComponent } from './liste-attente/liste-attente.component';

const routes: Routes = [
  { path: '', component: ListeAttenteComponent },
  { path: 'liste-attente', component: ListeAttenteComponent },
  { path: 'create-or-update-liste-attente', component: CreateOrUpdateListeAttenteComponent },
  { path: 'detail-liste-attente', component: DetailListeAttenteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListeAttenteRoutingModule { }
