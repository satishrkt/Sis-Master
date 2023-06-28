import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/models/api-service.service';
import { BusinessModel } from 'src/app/models/model';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {

  business !: BusinessModel[];

  formData : FormGroup;
  actionBtn : String = "Save";

  constructor(private fb : FormBuilder, private api : ApiServiceService, @Inject(MAT_DIALOG_DATA) public editData : any, private dataRef : MatDialogRef<AddBusinessComponent>) {
    this.formData = this.fb.group({
      // businessId : this.fb.control(''),
      businessName : this.fb.control('', Validators.required),
      businessLegalName : this.fb.control(''),
      businessIcon : this.fb.control('', null),
      mobile : this.fb.control('', Validators.required),
      email : this.fb.control('', [Validators.required, Validators.email]),
      GSTIN : this.fb.control(''),
      address : this.fb.control(''),
      city : this.fb.control(''),  
      state : this.fb.control(''),
      zipCode : this.fb.control(''),
      country : this.fb.control(''),
    });
  }

  ngOnInit(): void {
    if(this.editData.id.businessId !== null && this.editData.id.businessId !== undefined) {
      this.formData.patchValue(this.editData.id);
      this.actionBtn = "Update";
    } else {
      this.actionBtn = "Save";
    }
  }

  
  createBusiness() {
    if (this.editData && this.editData.id && this.editData.id.businessId !== null) {
      this.updateBusiness();
    } else {
      this.api.addBusinessDetails(this.formData.value).subscribe({
        next : (res : any) => {
          console.log(res);
          if(res.status === 1) {
            alert("Data Inserted Successfully");
            this.dataRef.close("save");
          } else {
            alert("Data Inserted Failed");
          }
        }, error : (err : any) => {
          alert("Data Not Inserted");
        }
      });
    }
  }

  updateBusiness() {
    this.formData.value.businessId = this.editData.id.businessId;
    this.api.updateBusinessDetails(this.formData.value).subscribe({
      next: (res : any) => {
        alert("Data Updated successfully");
        this.formData.reset();
        this.dataRef.close('update');
      },
      error: (err: any) => {
        alert("Data not updated");
      },
    });
  }
  
  imageUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString() || '';
      this.formData.patchValue({
        businessIcon: base64String
      });
    };
    reader.readAsDataURL(file);
  }  
  
  
}

  


