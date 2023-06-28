import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiServiceService } from 'src/app/models/api-service.service';
import { Country, State, City }  from 'country-state-city';
import { UserModel } from 'src/app/models/model';

@Component({
  selector: 'app-add-auditor',
  templateUrl: './add-auditor.component.html',
  styleUrls: ['./add-auditor.component.css']
})
export class AddAuditorComponent implements OnInit {

  // @ViewChild('businessName') businessName !: BusinessListComponent;
  // @ViewChild('locationName') locationName !: LocationListComponent;
  user : UserModel = new UserModel();
  formData !: FormGroup;
  countries = Country.getAllCountries();
  states : any;
  cities : any;

  selectedCountry: any;
  selectedState: any;
  selectedCity: any;

  constructor (private fb: FormBuilder, private api: ApiServiceService) {
    this.formData = this.fb.group({
      businessName : this.fb.control(''),
      locationName : this.fb.control(''),
      firstName : this.fb.control(''),
      middleName : this.fb.control(''),
      lastName : this.fb.control(''),
      mobile : this.fb.control(''),
      email : this.fb.control(''),
      address : this.fb.control(''),
      state : this.fb.control(''),
      city : this.fb.control(''),
      country : this.fb.control(''),
      zipCode : this.fb.control(''),
    })
  }

   ngOnInit(): void {
    // console.log(this.businessName);
    // console.log(this.locationName);
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
  

  onCityChange($event: any): void {
    this.selectedCity = this.selectedCity;
  }
  
  createAuditor() {
    console.log(this.formData.value)
  }
}
