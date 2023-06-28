import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { AuthGuard } from "./auth.guard";
import { BusinessListComponent } from "./business/business-list/business-list.component";
import { AddBusinessComponent } from "./business/add-business/add-business.component";
import { LocationListComponent } from "./location/location-list/location-list.component";
import { AddLocationComponent } from "./location/add-location/add-location.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuditorListComponent } from "./Auditor/auditor-list/auditor-list.component";
import { AddAuditorComponent } from "./Auditor/add-auditor/add-auditor.component";

export const route : Routes = [
    { 
        path : 'signup', component : UserComponent,
        children : [
            { path : '', component : SignUpComponent },
        ]
    },
    { 
        path : 'signin', component : UserComponent,
        children : [
            { path : '', component : SignInComponent },
        ]
    },
    { path : 'home', component : HomeComponent, canActivate : [AuthGuard] },
    { path : 'business-list', component : BusinessListComponent, canActivate : [AuthGuard] },
    { path : 'add-business', component : AddBusinessComponent, canActivate : [AuthGuard] },
    { path : 'location-list', component : LocationListComponent, canActivate : [AuthGuard] },
    { path : 'add-location', component : AddLocationComponent, canActivate : [AuthGuard] },
    { path : 'auditor-list', component : AuditorListComponent, canActivate : [AuthGuard] },
    { path : 'add-auditor', component : AddAuditorComponent, canActivate : [AuthGuard] },
    { path : '', redirectTo : '/signin', pathMatch : 'full' },
    { path: '**', component: PageNotFoundComponent },
]