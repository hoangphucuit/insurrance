import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AdminComponent } from '../admin/admin.component';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-dialogdelete',
  templateUrl: './dialogdelete.component.html',
  styleUrls: ['./dialogdelete.component.scss']
})
export class DialogdeleteComponent implements OnInit {


  ngOnInit() {
  }
    constructor( public customerSvc:CustomerService,
      public dialogRef: MatDialogRef<DialogdeleteComponent>,
     
      @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    onNoClick(): void {
      this.dialogRef.close();
      
    }
    deleteok():void{
      
      //this.customerSvc.deleteCustomer(id); 
      this.customerSvc.updateShowhide(this.data.id,false);
     
    //  if(this.data.typesort=="customers")
    //  {
    //   this.admincomponent.getCustomerActive();
    //  }
    //if(this.data.typesort=="allcustomers")
    // {
     //  this.admincomponent.getAllCustomer();
    // }
    // if(this.data.typesort=="deleted")
    // {
    //   this.admincomponent.getCustomersDeleted();
    // }
    }
  }

