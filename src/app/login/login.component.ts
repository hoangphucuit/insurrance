import { Component, OnInit } from '@angular/core';
import { Agent } from '../model/agent';
import { AgentService } from '../service/agent.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  agent= {} as Agent;
  constructor(public agentSvc:AgentService) { }

  ngOnInit() {
  }
login(agent:Agent){
  this.agentSvc.login(agent);
}

}
