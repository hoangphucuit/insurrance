import { Component, OnInit,ViewChild, AfterViewInit, OnChanges, Input } from '@angular/core';
import { Customer } from '../model/customers';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../service/customer.service';



@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customer={} as Customer;
  constructor(public customerSvc:CustomerService) { 
   
  }

  ngOnInit() {
  }
  addCustomer(customer){
     this.customerSvc.addCustomerSvc(customer);
  }
  
}
