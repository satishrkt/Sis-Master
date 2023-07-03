import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/models/api-service.service';
import { Country, State, City }  from 'country-state-city';
import { UserModel } from 'src/app/models/model';

@Component({
  selector: 'app-add-auditor',
  templateUrl: './add-auditor.component.html',
  styleUrls: ['./add-auditor.component.css']
})
export class AddAuditorComponent implements OnInit {

  @Input() data: any;
  user : UserModel = new UserModel();
  formData !: FormGroup;
  countries = Country.getAllCountries();
  states : any;
  cities : any;
  businessList : any;

  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  locationList: any;
  selectedBusiness: any;
  selectedLocation: any;

  constructor (private fb: FormBuilder, private api: ApiServiceService) {
    this.formData = this.fb.group({
      businessName : this.fb.control(''),
      locationName : this.fb.control(''),
      firstName : this.fb.control(''),
      middleName : this.fb.control(''),
      lastName : this.fb.control(''),
      mobile : ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      email : this.fb.control(''),
      address : this.fb.control(''),
      state : this.fb.control(''),
      city : this.fb.control(''),
      country : this.fb.control(''),
      zipCode : ['', [Validators.required, Validators.min(10), Validators.max(10)]]
    })
  }

   ngOnInit(): void {
    this.getBusinessDetails();
    console.log(this.data)
  }

  onCountryChange(selectedCountry: any) {
    if (selectedCountry !== null) {
      const countryIsoCode = selectedCountry.isoCode;
      this.states = State.getStatesOfCountry(countryIsoCode);
      this.selectedCountry = selectedCountry;
      this.cities = this.selectedState = this.selectedCity = null;
    }
  }
  
  onStateChange(selectedState: any) {
    if (selectedState !== null) {
      const stateIsoCode = selectedState.isoCode;
      this.cities = City.getCitiesOfState(this.selectedCountry.isoCode, stateIsoCode);
      this.selectedState = selectedState;
      this.selectedCity = null;
    }
  }

  onChangeBusiness(selectedBusiness : any) {
    if(selectedBusiness !== null) {
      const businessId = selectedBusiness;
      this.getLocationList(businessId);
      this.selectedBusiness = selectedBusiness;
      this.selectedLocation = null;
    }

  }

  onCityChange($event: any): void {
    this.selectedCity = this.selectedCity;
  }
  
  createAuditor() {
    if(this.formData.value.businessId !== null && this.formData.value.businessId !== '') {
      if(this.formData.value.locationId !== null && this.formData.value.locationId !== '') {
        this.api.createAuditor(this.formData.value).subscribe((res : any) => {
          if(res.status === 1 && res.msg === 'SUCCESS') {
            alert("Data Inserted Successfully")
          } else {
            alert("Datanot inserted");
          }
        });
      } else{
        alert("Please Select Location");
      }
    } else { 
      alert("Please select any Business");
    }
  }

  getBusinessDetails() {
    this.api.getBusinessDetails().subscribe((res : any) => {
      if(res.status === 1 && res.msg === 'SUCCESS') {
        this.businessList = res.data[0].details;
      } else {
        alert("Data not feched");
      }
    });
  }

  getLocationList(businessId: any) {
    this.api.getLocationDetails(businessId).subscribe((res:any) => {
      if(res.status === 1 && res.msg === 'SUCCESS') {
        this.locationList = res.data[0].details;
        console.log(this.locationList)
      } else  {
        alert('On this business not any locations Feched');
      }
    });
  }

  
}
