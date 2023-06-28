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
  url : string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";

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

  getBusinessDetails() : Observable<BusinessModel[]> { 
    return this.http.post<BusinessModel[]>(this.baseUrl+"/getBusinessDetails", null);
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

  getLocationDetails() : Observable<LocationModel[]> {
    return this.http.post<LocationModel[]>(this.baseUrl+"/getLocationDetails", null);
  }

  createLocation(data : any) : Observable<LocationModel[]> {
    return this.http.post<LocationModel[]>(this.baseUrl+"/createBusinessLocation", data);
  }
  
  getUsersDetails() : Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.baseUrl+'/getUsersDetails', null);
  }

  logout() {
    localStorage.clear();
    alert("logout successfully");
    this.route.navigate(['/signin']);
  }

  createAuditor(data : any) : Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.baseUrl+'/createAuditor', data);
  }

  getAddress() : Observable<any> {
    return this.http.get<any>(this.url);
  }

  deleteBusiness(data: any) {
    return this.http.post(this.baseUrl+'/deleteBusiness', data)
  }

   
}


