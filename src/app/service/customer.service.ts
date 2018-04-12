import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Customer } from '../model/customers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgForm, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Agent } from '../model/agent';
@Injectable()
export class CustomerService {
customer={} as Customer;
 customersRef:AngularFireList<any>;
 customers:Observable<any[]>;
 
 usersRef:AngularFireList<any>;
 users:Observable<any[]>;
  constructor(private db:AngularFireDatabase, public snackBar: MatSnackBar) { 
    this.getCustomersDeleted();
    this.usersRef = this.db.list('users');
    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.customersRef = this.db.list('customers');
    this.customers = this.customersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  getAllCustomer(){
    return this.db.list('customers').valueChanges();
  }
  _addEditCustomerSvc(form?: FormGroup, Edit?: boolean, id?: string){
    var tem = this.db.list('customers');
    const getKey = tem.push({});
    if (Edit) {
      return tem.update(id, form.value);
    } else if (!Edit){
      form.value.id = getKey.key;
      form.value.showhide = true;
      return getKey.set(form.value) && tem.update(getKey.key, form.value);
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  updateShowhide(key: string,showhide:boolean){
    this.customersRef.update(key,{
      showhide:showhide,
    });
  }
  
  getCustomer(id: string) {
    return this.db.object(`customers/${id}`).valueChanges();
  }

selectView(){
  var tem = this.db.list('users');
    const getKey = tem.push({});
  
    getKey.set({
      id: getKey.key,
      name:"Phuc",
      selectView:"option1",
    });
}
getSelectView(id:string) {
  
    return this.db.object(`users/${id}`).valueChanges();
 }

deleteCustomer(id:string){
  this.customersRef.remove(id);
}
updateSelectView(key:string,select:string){
this.usersRef.update(key,{
  selectView:select,
});
}
getCustomersDeleted(){
  return this.db.list('customers',ref=>ref.orderByChild('showhide').equalTo(false)).valueChanges();

}
getCustomersActive(){
   return this.db.list('customers',ref=>ref.orderByChild('name')).valueChanges();
}
}
