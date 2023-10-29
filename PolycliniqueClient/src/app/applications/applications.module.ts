import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { GestionDossiersModule } from './gestion-dossiers/gestion-dossiers.module';
import { GestionUtilisateurModule } from './gestion-utilisateur/gestion-utilisateur.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    GestionDossiersModule,
    GestionUtilisateurModule,
  ]
})
export class ApplicationsModule { }
