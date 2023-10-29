import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dossiers/dossiers.module').then(m => m.DossiersModule),
    pathMatch: 'full'
  },
  {
    path: 'dossiers',
    loadChildren: () => import('./dossiers/dossiers.module').then(m => m.DossiersModule),
  },
  {
    path: 'liste-attente',
    loadChildren: () => import('./liste-attente/liste-attente.module').then(m => m.ListeAttenteModule),
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionDossiersRoutingModule { }
