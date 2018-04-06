import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customers';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataSource } from '@angular/cdk/table';
import { Agent } from '../model/agent';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogdeleteComponent } from '../dialogdelete/dialogdelete.component';
import { DialogrecoveryComponent } from '../dialogrecovery/dialogrecovery.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  typesort="customers";
 
showhide:boolean;
  sourceCustomer:Customer[];
  deletedCustomers:Customer[];
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
    public dialog: MatDialog
  ) {
    this.getCustomerActive();
    
    
  }

  ngOnInit() {
    this.customerSvc.getSelectView('-L99fmHp5U1SxkFGUJm0').subscribe(cus=> {
      if(cus)
      {
       this.agent = cus;
      }
    });
   
  }
 
  getAllCustomer(){
    this.customerSvc.getAllCustomer().subscribe(customers=>{
      
      this.sourceCustomer=customers;
      this.listCustomer.data=customers;
     
    });
  }
  getCustomerActive(){
    this.customerSvc.getCustomersActive().subscribe(customers=>{
      
      this.sourceCustomer=customers;
      this.listCustomer.data=customers;
     
    });
  }
  getCustomersDeleted(){
    this.customerSvc.getCustomersDeleted().subscribe(customers=>{
      this.sourceCustomer=customers;
      this.listCustomer.data=customers;
      
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
 
  // onChange(event,id:string){
  //   let dialogRef = this.dialog.open(DialogrecoveryComponent, {
  //     width: '250px',
  //     data: { name: name,id:id,typesort:this.typesort,done:""}
  //   });
  //  // this.customerSvc.updateShowhide(id,event.checked);//event.checked la true or false.
    
  //  dialogRef.afterClosed().subscribe(result => {
  //   if(result!=undefined)//click ok
  //   { 
  //     if(this.typesort=="deleted")
  //     {
  //       this.getCustomersDeleted();
  //     }
  //     if(this.typesort=="allcustomers")
  //     {
  //       this.getAllCustomer();
  //     }
  //   }
  // });
  // }
  editCustomerByID(){

  }
  deleteCustomerByID(id,name): void {
    let dialogRef = this.dialog.open(DialogdeleteComponent, {
      width: '250px',
      data: { name: name,id:id,typesort:this.typesort,done:""}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined)//click ok
      { 
        if(this.typesort=="customers")
        {
          this.getCustomerActive();
        }
        if(this.typesort=="allcustomers")
        {
          this.getAllCustomer();
        }
      }
    });
   
  }
 recoverCustomerByID(id,name): void {
    let dialogRef = this.dialog.open(DialogrecoveryComponent, {
      width: '250px',
      data: { name: name,id:id,typesort:this.typesort,done:""}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined)//click ok
      { 
        if(this.typesort=="deleted")
        {
          this.getCustomersDeleted();
        }
        if(this.typesort=="allcustomers")
        {
          this.getAllCustomer();
        }
      }
    });
   
  }


    //this.customerSvc.deleteCustomer(id);
    //khi xoa se disable toggle
    
    // this.customerSvc.updateShowhide(id,false);
    // if(this.typesort=="customers")
    // {
    //   this.getCustomerActive();
    // }
    // if(this.typesort=="allcustomers")
    // {
    //   this.getAllCustomer();
    // }
    // if(this.typesort=="deleted")
    // {
    //   this.getCustomersDeleted();
    // }
  
  sortCustomers(event){
    
    switch(event.value) { 
      case "deleted": { 
       this.getCustomersDeleted();
         break; 
      }
      case "customers":{
        this.getCustomerActive();
        break;
      }
     case "allcustomers":{
       this.getAllCustomer();
       break;
     }
   } 
  }
 
  selectView(event){
    
    this.defaultView=event.value;
    this.customerSvc.updateSelectView('-L99fmHp5U1SxkFGUJm0',event.value);
   

  }
  selectViewicon(event){
    
    this.defaultView=event;
    this.customerSvc.updateSelectView('-L99fmHp5U1SxkFGUJm0',event);
   

  }
}





