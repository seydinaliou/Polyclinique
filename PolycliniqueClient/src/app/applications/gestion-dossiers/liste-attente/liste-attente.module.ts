import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeAttenteRoutingModule } from './liste-attente-routing.module';
import { ListeAttenteComponent } from './liste-attente/liste-attente.component';
import { DetailListeAttenteComponent } from './detail-liste-attente/detail-liste-attente.component';
import { CreateOrUpdateListeAttenteComponent } from './create-or-update-liste-attente/create-or-update-liste-attente.component';


@NgModule({
  declarations: [
    ListeAttenteComponent,
    DetailListeAttenteComponent,
    CreateOrUpdateListeAttenteComponent
  ],
  imports: [
    CommonModule,
    ListeAttenteRoutingModule
  ]
})
export class ListeAttenteModule { }
