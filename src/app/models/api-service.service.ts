import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessModel, LocationModel, UserModel } from './model';
import { Router, Routes } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl = "http://localhost/Ang_Api/api/v1/public/index.php";

  constructor(private http: HttpClient, private route: Router) { }

  userAuthentication(username : any, password : any) {
    var data = JSON.stringify({
      username: username,
      password: password
    });
    var reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    
    return this.http.post(this.baseUrl+"/loginSuperAdmin", data, {headers : reqHeader})
  }

  get isLoggedIn() : boolean {
    const token = localStorage.getItem('token');
    return token !== null ? true : false;
  }

  getBusinessDetails(data? : any) : Observable<BusinessModel[]> { 
    return this.http.post<BusinessModel[]>(this.baseUrl+"/getBusinessDetails", {busniessId : data});
  }

  addBusinessDetails(formData: FormData) {
    return this.http.post<BusinessModel[]>(this.baseUrl + '/createBusiness', formData);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  updateBusinessDetails(data: any) {
    return this.http.post<BusinessModel[]>(this.baseUrl + '/createBusiness', data);
  }

  getDashboardDetails() {
    return this.http.post(this.baseUrl+'/dashboardDetails', null);
  }

  getLocationDetails(data? : any) : Observable<LocationModel[]> {
    return this.http.post<LocationModel[]>(this.baseUrl+"/getLocationDetails", { businessId: data});
  }

  createLocation(data : any) : Observable<LocationModel[]> {
    return this.http.post<LocationModel[]>(this.baseUrl+"/createBusinessLocation", data);
  }
  
  getUsersDetails(data? : any) : Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.baseUrl+'/getUsersDetails', {typeId : data});
  }

  logout() {
    localStorage.clear();
    alert("logout successfully");
    this.route.navigate(['/signin']);
  }

  createAuditor(data : any) : Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.baseUrl+'/createAuditor', data);
  }

  deleteBusiness(data: any) {
    return this.http.post(this.baseUrl+'/deleteBusiness', data)
  }

   
}


