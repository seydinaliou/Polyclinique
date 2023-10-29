import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: "",component: IndexComponent,
  },
  {
    path: 'gestion-agent',
    loadChildren: () => import('./gestion-utilisateur/gestion-agent/gestion-agent.module').then(m => m.GestionAgentModule), 
  },
  {
    path: 'gestion-utilisateur',
    loadChildren: () => import('./gestion-utilisateur/gestion-utilisateur.module').then(m => m.GestionUtilisateurModule),
  },

  // {
  //   path: '',
  //   loadChildren: () => import('./gestion-agent/gestion-agent.module').then(m => m.GestionAgentModule), 
  // },
  // { 
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./gestion-agent/gestion-agent.module').then(m => m.GestionAgentModule), 
  //       // pathMatch: 'full'
  //     },
  //     {
  //       path: 'gestion-agent',
  //       loadChildren: () => import('./gestion-agent/gestion-agent.module').then(m => m.GestionAgentModule), 
  //     }
  //   ]
  // },
  // { 
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./gestion-dossiers/gestion-dossiers.module').then(m => m.GestionDossiersModule), 
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'gestion-dossiers',
  //       loadChildren: () => import('./gestion-dossiers/gestion-dossiers.module').then(m => m.GestionDossiersModule)
  //     }
  //   ],
  // },
  // { 
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./gestion-utilisateur/gestion-utilisateur.module').then(m => m.GestionUtilisateurModule),
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'gestion-utilisateur',
  //       loadChildren: () => import('./gestion-utilisateur/gestion-utilisateur.module').then(m => m.GestionUtilisateurModule),    
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
