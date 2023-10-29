import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailDossierComponent } from './detail-dossier/detail-dossier.component';
import { ListeDossierComponent } from './liste-dossier/liste-dossier.component';
import { NouveauDossierComponent } from './nouveau-dossier/nouveau-dossier.component';

const routes: Routes = [
  { path: '', component: ListeDossierComponent }, 
  { path: 'liste-dossier', component: ListeDossierComponent },
  { path: 'nouveau-dossier', component: NouveauDossierComponent }, 
  { path: 'detail-dossier', component: DetailDossierComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossiersRoutingModule { }
