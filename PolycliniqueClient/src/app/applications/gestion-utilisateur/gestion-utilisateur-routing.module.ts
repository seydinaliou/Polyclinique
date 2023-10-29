import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./comptes/comptes.module').then(m => m.ComptesModule),
    pathMatch: 'full'
  },
  {
    path: 'comptes',
    loadChildren: () => import('./comptes/comptes.module').then(m => m.ComptesModule),    
  },  
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),  
  },  
  {
    path: 'gestion-agent',
    loadChildren: () => import('./gestion-agent/gestion-agent.module').then(m => m.GestionAgentModule),  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionUtilisateurRoutingModule { }
