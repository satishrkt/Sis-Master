export class LoginModel{
    // email : any;
    username : any;
    password : any;
}

export class SignupModel {
    fname : any;
    lname : any;
    email : any;
    password : any;
}

export class BusinessModel {
    userId : any;
    businessId : any;
    businessName : any;
    businessLegalName : any;
    businessIcon : any;
    businessLogo : any;
    mobile : any;
    email : any;
    GSTIN :  any;
    address : any;
    locality : any;
    city :  any;
    state : any;
    country : any;
    zipCode : any;
    latitude :any;
    longitude : any;
    createdDate : any;
    modifiedDate : any;
    startDate : any;
    action : any;
    // status: boolean = false;
}

export class LocationModel {
    userId: any;
    businessId: any;
    locationId: any;
    businessName: any;
    locationName: any;
    businessLegalName: any;
    locationIcon: any;
    locationLogo: any;
    GSTIN: any;
    mobile: any;
    email: any;
    address: any;
    locality: any;
    city: any;
    state: any;
    country: any;
    zipCode: any;
    latitude: any;
    longitude: any;
    createdDate: any;
    ModifiedDate: any;
    StartDate: any;
    action : any;
}

export class UserModel {
    userId : any;
    userDetailsId : any;
    locationId: any;
    businessName: any;
    locationName: any;
    mobile: any;
    email: any;
    typeId : number = 1005;
    dialingCode: any;
    firstName: any;
    middleName: any;
    lastName: any;
    address: any;
    locality: any;
    city: any;
    state: any;
    country: any;
    zipCode: any;  
    action : any             
}