import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customers';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataSource } from '@angular/cdk/table';
import { Agent } from '../model/agent';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
showhide:boolean;
  sourceCustomer:Customer[];
  displayedColumns = ['id', 'name', 'phone', 'address','showhide','editdelete','xxx'];
  listCustomer = new MatTableDataSource<Customer>();
  defaultView="option1";
  agent= {} as Agent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {//phan trang
    this.listCustomer.paginator = this.paginator;
      this.listCustomer.sort = this.sort;
    
  }
  constructor(
    private router: Router,
    public customerSvc:CustomerService,
    
  ) {
    
  }

  ngOnInit() {
    this.getAllCustomer();
    
    this.customerSvc.getSelectView('-L99fmHp5U1SxkFGUJm0').subscribe(cus=> {
      if(cus)
      {
       this.agent = cus;
       console.log(this.agent.selectView);
      }
    });
    
  }
  getAllCustomer(){
    this.customerSvc.getAllCustomer().subscribe(customers=>{
      
      this.sourceCustomer=customers;
      this.listCustomer.data=customers;
      console.log(this.listCustomer.data);
    });
  }
 applyFilter(filterValue: string) { //search
     filterValue = filterValue.trim(); // Remove whitespace
     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.listCustomer.filter = filterValue;
   }
  addCustomer() {
    this.router.navigate(['/customer']);
  }
  onChange(event,id:string){
    
    this.customerSvc.updateShowhide(id,event.checked);//event.checked la true or false.
    
  }
  editCustomerByID(){

  }
  deleteCustomerByID(id){
    //this.customerSvc.deleteCustomer(id);
    //khi xoa se disable toggle
    this.customerSvc.updateShowhide(id,false);
  }
  selectView(event){
    
    this.defaultView=event.value;
    this.customerSvc.updateSelectView('-L99fmHp5U1SxkFGUJm0',event.value);
    console.log(this.defaultView);
  }
}





/*export class CustomerDataSource extends DataSource<any> {
 
  constructor(private customerSvc: CustomerService) {
  super()
  }
 
  connect() {
    
    return this.customerSvc.getAllCustomer();
  }
 
  disconnect() {
 
  }
}*/






/*
export interface Element {
  name: string;
  position: number;
  age: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Hydrogen', age: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', age: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', age: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', age: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', age: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', age: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', age: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', age: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', age: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', age: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', age: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', age: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', age: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', age: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', age: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', age: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', age: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', age: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', age: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', age: 40.078, symbol: 'Ca' },
];*/