import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionUtilisateurRoutingModule } from './gestion-utilisateur-routing.module';
import { ComptesModule } from './comptes/comptes.module';
import { PrivilegesModule } from './privileges/privileges.module';
import { RolesModule } from './roles/roles.module';
import { GestionAgentModule } from './gestion-agent/gestion-agent.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GestionUtilisateurRoutingModule,
    ComptesModule,
    PrivilegesModule,
    RolesModule,
    GestionAgentModule,
  ]
})
export class GestionUtilisateurModule { }
