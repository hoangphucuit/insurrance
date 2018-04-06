import { Component, OnInit,ViewChild, AfterViewInit, OnChanges, Input, NgModule } from '@angular/core';
import { Customer } from '../model/customers';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Promise } from 'q';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customer={} as Customer;
  idurl: string = "";
  listcustomer:any;
  relationSpinner: boolean = true;
  loading: boolean = false;
  checkIdExist: boolean = false;
  submited: boolean = false;
  relationCounter: any;
  headerTitle: string = "CUSTOMER PAGE";
  relationLevel = ['Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter','Grandfather', 'Grandmother'];

  constructor(public customerSvc:CustomerService,private activeroute: ActivatedRoute, ) { 
   this.idurl=this.activeroute.snapshot.params.id;
   this.relationCounter = [];
   this.customer.relation = [];
  }
  ngOnInit() {
   this.customerSvc.getCustomer(this.idurl).subscribe(cus=> {
     if (cus) {
        this.customer = cus;
        this.checkIdExist=true;
        this.headerTitle += '/EDIT';
        if (!this.customer.relation) {
          this.customer.relation = [];
        } 
        this.relationCounter = [];
        for (var i =1; i <= this.customer.relation.length; i ++) {
          this.relationCounter.push(i);
        }
        this.relationSpinner = false;
     } else {this.headerTitle += '/ADD';}
   })
  }
  _restore() {
    this.ngOnInit();
  }
  _resetForm(form: NgForm) {
    return form.reset();
  }
  SubmitForm(form: NgForm) {

    let i = this.relationCounter.length? this.relationCounter[this.relationCounter.length-1] : 0;
    this.loading = true;
    if (form.valid) {
        if (this.checkIdExist) {
          //Edit
          this.customerSvc._addEditCustomerSvc(form, i, this.checkIdExist, this.idurl).then(
            (success)=> {
              this.customerSvc.openSnackBar('Update customer success!','');
              this.loading = false;
            },
            (error) => {
              this.loading = false;
              this.customerSvc.openSnackBar('Update customer fail!','Please again');
            }
          );
        } else {
          //Add
          this.customerSvc._addEditCustomerSvc(form, i, this.checkIdExist).then(
            (success)=> {
              this.customerSvc.openSnackBar('Add customer success!','');
              this.loading = false;
            },
            (error)=> {
              this.loading = false;
              this.customerSvc.openSnackBar('Add customer fail!','Please again');
            }
          );
        }
    } else {
        this.loading = false;
        this.customerSvc.openSnackBar('Form must enter as required','Please again');
    }
  }
  addRelation() {
   
    let i = this.relationCounter[this.relationCounter.length-1]? this.relationCounter[this.relationCounter.length-1] : 0;
    this.relationCounter.push(i+1);
    console.log(this.relationCounter);
  }
  removeRalation(i: number) {
   
    this.relationCounter.splice(i, 1);
    console.log(this.relationCounter);
  }
  removeRalationAf(i: number) {
    if (!i) {
      return false;
    }
    alert('Delete Firebase')
  }

}
