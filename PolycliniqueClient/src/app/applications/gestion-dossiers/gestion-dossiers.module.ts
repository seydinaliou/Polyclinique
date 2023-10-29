import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionDossiersRoutingModule } from './gestion-dossiers-routing.module';
import { DossiersModule } from './dossiers/dossiers.module';
import { ListeAttenteModule } from './liste-attente/liste-attente.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GestionDossiersRoutingModule,
    DossiersModule,
    ListeAttenteModule
  ]
})
export class GestionDossiersModule { }
