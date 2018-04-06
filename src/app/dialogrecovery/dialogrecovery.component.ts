
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CustomerService } from '../service/customer.service';
@Component({
  selector: 'app-dialogrecovery',
  templateUrl: './dialogrecovery.component.html',
  styleUrls: ['./dialogrecovery.component.scss']
})
export class DialogrecoveryComponent implements OnInit {

  constructor(public customerSvc:CustomerService,
    public dialogRef: MatDialogRef<DialogrecoveryComponent>,
   
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
    
  }
  deleteok():void{
    
    //this.customerSvc.deleteCustomer(id); 
    this.customerSvc.updateShowhide(this.data.id,true);
  }
}
