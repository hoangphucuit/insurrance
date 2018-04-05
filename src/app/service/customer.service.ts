import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Customer } from '../model/customers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Agent } from '../model/agent';
@Injectable()
export class CustomerService {
customer={} as Customer;
 customersRef:AngularFireList<any>;
 customers:Observable<any[]>;
 usersRef:AngularFireList<any>;
 users:Observable<any[]>;
  constructor(private db:AngularFireDatabase) { 
    this.getCustomersDeleted();
    this.customersRef = this.db.list('customers');
    this.customers = this.customersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.usersRef = this.db.list('users');
    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  getAllCustomer(){
    return this.db.list('customers').valueChanges();
    
  }
  addCustomerSvc(customer){
  //  this.db.list('customers').push({
   
  //    name:customer.name,
  //    phone:customer.phone,
  //    showhide:true,
  //  });
  var tem = this.db.list('customers');
  const getKey = tem.push({});
  
  getKey.set({
    id: getKey.key,
    name: customer.name,
    phone:customer.phone,
    address:customer.address,
   
    showhide:true,
  });
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
updateShowhide(key: string,showhide:boolean){
  this.customersRef.update(key,{
    showhide:showhide,
  });
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
  return this.db.list('customers',ref=>ref.orderByChild('showhide').equalTo(true)).valueChanges();

}
}
