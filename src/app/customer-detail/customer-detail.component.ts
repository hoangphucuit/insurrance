import { Component, OnInit,ViewChild, AfterViewInit, OnChanges, Input } from '@angular/core';
import { Customer } from '../model/customers';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customer={} as Customer;
  idurl: string;
  constructor(public customerSvc:CustomerService,private activeroute: ActivatedRoute,) { 
   this.idurl=this.activeroute.snapshot.params.id;
   console.log(this.idurl);
  }

  ngOnInit() {
  }
  addCustomer(customer){
     this.customerSvc.addCustomerSvc(customer);
  }
  
}


