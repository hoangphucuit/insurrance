import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Customer } from '../model/customers';
import { Reference } from '@firebase/database-types';
import * as firebase from 'firebase';
@Injectable()
export class CustomerService {
customer={} as Customer;
public customerListRef: Reference;
  constructor(private db:AngularFireDatabase) { 
    this.customerListRef = this.db.database.ref('customers');
   
  }
  getAllCustomer(){
    return this.db.list('customers').valueChanges();
    
  }
  addCustomerSvc(customer){
   this.db.list('customers').push({
     name:customer.name,
     phone:customer.phone,
   });
//     return this.db.database.ref('customers/').set({
//      nameCus:customer.nameCus,
//      phoneCus:customer.phone,
//     });
// }
}

}
