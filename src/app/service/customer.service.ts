import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Customer } from '../model/customers';
@Injectable()
export class CustomerService {

  constructor(private db:AngularFirestore) { }

  getAllCustomer(){
    return this.db.collection('customers').snapshotChanges().map(actions => {
      return actions.map(act => {
        const data = act.payload.doc.data() as Customer;
        
        return data;
      });
    });
}
addCourse(customer: Customer): void {
   this.db.collection('customers').add(customer);
}
}
