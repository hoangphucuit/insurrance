import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Customer } from '../model/customers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Agent } from '../model/agent';
import { Router } from '@angular/router';
@Injectable()
export class AgentService {
agent={} as Agent;
  constructor(private router: Router,private db:AngularFireDatabase,public afAuth: AngularFireAuth) { }
  async login(agent:Agent){
    try{
      const result=await this.afAuth.auth.signInWithEmailAndPassword(agent.email,agent.password).then(ok=>{
        if(ok){
          
          this.router.navigate(['/admin']);
          alert('Login success');
        }
      });
     
    }
    catch(error){
      console.log(error);
    }
    
  }
}
