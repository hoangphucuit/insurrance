import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Customer } from '../model/customers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Agent } from '../model/agent';
import { query } from '@angular/core/src/animation/dsl';
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
  _addEditCustomerSvc(form: NgForm, counter: number, Edit: boolean, id?: string){
    var tem = this.db.list('customers');
    const getKey = tem.push({});
    let dataCustomer = {};
    let dataRelation = [];
   
    if (counter > 0) {
      //Exist Relation
      for (var i = 0; i <= counter; i ++) {
        if (form.controls['r_name_'+i]) {
          dataRelation.push({
            name: form.controls['r_name_'+i].value,
            relation: form.controls['r_relate_'+i].value,
            phone: form.controls['r_phone_'+i].value,
            address: form.controls['r_address_'+i].value,
            birthday: form.controls['r_birthday_'+i].value
          })
          dataCustomer = {
            id: id? id: getKey.key,
            name: form.controls['name'].value,
            birthday: form.controls['birthday'].value,
            address: form.controls['address'].value,
            phone: form.controls['phone'].value,
            showhide: form.controls['showhide']?form.controls['showhide'].value:true,
            relation: dataRelation
          }
        }
      }
    } else {
      dataCustomer = {
        id: id? id: getKey.key,
        name: form.controls['name'].value,
        birthday: form.controls['birthday'].value,
        address: form.controls['address'].value,
        phone: form.controls['phone'].value,
        showhide: form.controls['showhide']?form.controls['showhide'].value:true,
        relation: ""
      }
    } 
    if (Edit) {
      return tem.update(id, dataCustomer);
    } else if (!Edit){
      return getKey.set(dataCustomer) && tem.update(getKey.key, dataCustomer);
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  dateFormat(date: Date) {
   var string= JSON.stringify(date).split('T')[0].split('"')[1];
   var year =  string.split('-')[0];
   var month =  string.split('-')[1];
   var day =  Number(string.split('-')[2])+1;
   return month+'/'+day+'/'+year;
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
  if(select=="option1")
  {
    this.usersRef.update(key,{
      selectView:true,
      selectView2:false
    });
  }
  else{
    this.usersRef.update(key,{
      selectView:false,
      selectView2:true
    });
  }
}
getCustomersDeleted(){
  return this.db.list('customers',ref=>ref.orderByChild('showhide').equalTo(false)).valueChanges();

}
getCustomersActive(){
  //return this.db.list('customers',ref=>ref.orderByChild('showhide').equalTo(true)).valueChanges();
return this.db.list('customers',ref=>ref.orderByChild('name')).valueChanges();

}

}
