import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { CreateOrUpdateAgentComponent } from './create-or-update-agent/create-or-update-agent.component';
import { ListeAgentComponent } from './liste-agent/liste-agent.component';


@NgModule({
  declarations: [
    CreateOrUpdateAgentComponent,
    ListeAgentComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule
  ]
})
export class AgentModule { }
