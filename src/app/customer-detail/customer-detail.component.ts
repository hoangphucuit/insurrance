import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customers';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../service/customer.service';



@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
customer:Customer;
  constructor(public customerSvc:CustomerService) { }

  ngOnInit() {
  }
  addCustomer(){
    this.customer.name="phuc";
    this.customer.phone="01226262121";
    this.customerSvc.addCourse(this.customer);
  }

}
