import { Component, OnInit,ViewChild, AfterViewInit, OnChanges, Input, NgModule } from '@angular/core';
import { Customer } from '../model/customers';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Promise } from 'q';

import { ReactiveFormsModule,
  FormsModule, 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators,
  FormArray 
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Relationship } from '../model/relationship';
import { DISABLED } from '@angular/forms/src/model';



@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customer={} as Customer;
  relationship={} as Relationship;

  idurl: string = "";
  relationSpinner: boolean = true;
  submiting: boolean = false;
  checkIdExist: boolean = false;
  headerTitle: string = "";
  relationLevel = ['Husband','Wife','Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter','Grandfather', 'Grandmother'];


  myForm: FormGroup;

  constructor(
    public customerSvc:CustomerService,
    private activeroute: ActivatedRoute,
    private _fb: FormBuilder 
  ) { 
   this.idurl=this.activeroute.snapshot.params.id;

  }
  ngOnInit() {

   this.initCustomer();
   this.customerSvc.getCustomer(this.idurl).subscribe(cus=> {
     if (cus) {
        this.customer = cus;
        this.initCustomer(this.customer);
        this.checkIdExist=true;
        this.headerTitle = 'CUSTOMER PAGE/EDIT';
        this.relationSpinner = false;
        if (this.customer.relation) {
          this.customer.relation.forEach(element=> {
            this.relationship = element;
            this.addRelation(this.relationship);
          })
        }
     } else {
 
       this.headerTitle = 'CUSTOMER PAGE/ADD';}
   })
  }

  initCustomer(val?: Customer) {
    this.myForm = this._fb.group({
      name:       [val?val.name:'', Validators.required],
      birthday:   [val?val.birthday:'', [Validators.required]],
      phone:      [val?val.phone: '', [Validators.required, Validators.pattern("([0-9]+)")]],
      address:    [val?val.address:'', Validators.required],
      id:         [val?val.id:''],
      showhide:   [val?val.showhide:''],
      relation:   this._fb.array([
         //this.initRelation()
      ])
    })
  }
  initRelation(val?: Relationship) {
    return this._fb.group({
      r_name:     [val?val.r_name:'', Validators.required],
      r_relate:   [val?val.r_relate:'', Validators.required],
      r_phone:    [val?val.r_phone:'', Validators.pattern("([0-9]+)")],
      r_address:  [val?val.r_address:''],
      r_birthday: [val?val.r_birthday:'']
    })
  }

  _restore() {
    this.ngOnInit();
  }
  _resetForm() {
    return this.myForm.reset();
  }
  SubmitForm() {
    console.log(this.myForm.controls);
    if (this.myForm.valid) {
      this.submiting = true;
      this.customerSvc._addEditCustomerSvc(this.myForm, this.checkIdExist,this.idurl).then(
        (success)=> {
          this.customerSvc.openSnackBar('Success','');
          this.submiting = false;
        },
        (err)=> {
          this.submiting = false;
          this.customerSvc.openSnackBar('Errors, fail!','Please again!');
        }
      );
    } else {
      this.customerSvc.openSnackBar('Please enter correct value to fields are required','Please again!');
    }
    
  }
  addRelation(relation?: Relationship) {
    const control = <FormArray>this.myForm.controls['relation'];
    control.push(this.initRelation(relation));
  }
  removeRalation(i: number) {
    const control  = <FormArray>this.myForm.controls['relation'];
    control.removeAt(i);
  }


}
