import { LocationModel } from './../../models/model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/models/api-service.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit{

  formData !: FormGroup;
  isEdit: any;

  locModel : LocationModel = new LocationModel();

  actionButton = "Save";
  businessList: any;

  constructor(private api: ApiServiceService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data : any, 
    private dataRef: MatDialogRef<AddLocationComponent>) {
    this.isEdit = data.isEdit;
    this.formData = this.fb.group({
      businessId : this.fb.control('', Validators.required),
      locationName : this.fb.control('', Validators.required),
      locationLegalName : this.fb.control(''),
      GSTIN : this.fb.control('', Validators.required),
      mobile : this.fb.control('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      email : this.fb.control('', [Validators.required, Validators.email]),
      address : this.fb.control(''),
      city : this.fb.control(''),
      state : this.fb.control(''),
      country : this.fb.control(''),
      zipCode : this.fb.control('', [Validators.minLength(6), Validators.maxLength(6)]),
    });
  }

  ngOnInit(): void {
    this.getBusinessDetails();
    if(this.isEdit) {
      this.formData.patchValue(this.data.id);
    }
    
  }

  createLocation() {
    if(this.isEdit) {
      this.formData.value.locationId = this.data.id.locationId;
      this.api.createLocation(this.formData.value).subscribe((res : any) => {
        if(res.status === 1 && res.msg === 'SUCCESS') {
          // console.log(res)
          alert("Data Updated Successfully");
          this.formData.reset();
          this.dataRef.close('update');
        } else {
          alert("Data not updated");
        }
      });
    } else {
      if(this.formData.value.businessId !== 'null' && this.formData.value.businessId !== '') {
        this.api.createLocation(this.formData.value).subscribe((res : any) => {
          if(res.status === 1 && res.msg === 'SUCCESS') {
            alert("Data Inserted Successfully");
            this.formData.reset();
            this.dataRef.close('save');
          } else {
            alert("Data not inserted");
          }
        });
      } else {
        alert('Please select business');
      }
    }
  }

  getBusinessDetails() {
    this.api.getBusinessDetails().subscribe((res : any) => {
      this.businessList = res.data[0].details;
    });
  }
}
