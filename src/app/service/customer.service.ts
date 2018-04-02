import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Customer } from '../model/customers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class CustomerService {
customer={} as Customer;
 customersRef:AngularFireList<any>;
 customers:Observable<any[]>;
  constructor(private db:AngularFireDatabase) { 
    this.customersRef = this.db.list('customers');
    this.customers = this.customersRef.snapshotChanges().map(changes => {
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
    birthday:customer.birthday,
    showhide:true,
  });
}
updateShowhide(key: string,showhide:boolean){
  this.customersRef.update(key,{
    showhide:showhide,
  });
}
deleteCustomer(id:string){
  this.customersRef.remove(id);
}
}
