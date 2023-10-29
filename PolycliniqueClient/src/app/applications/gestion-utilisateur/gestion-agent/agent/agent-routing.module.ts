import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrUpdateAgentComponent } from './create-or-update-agent/create-or-update-agent.component';
import { ListeAgentComponent } from './liste-agent/liste-agent.component';

const routes: Routes = [
  { path: '',   redirectTo: 'liste-agent', pathMatch: 'full' },
  { path: 'liste-agent', component: ListeAgentComponent },
  { path: 'create-or-update-agent', component: CreateOrUpdateAgentComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
