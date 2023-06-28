import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { route } from './routes';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BusinessListComponent } from './business/business-list/business-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddBusinessComponent } from './business/add-business/add-business.component';
import { MatDialogModule } from '@angular/material/dialog'
import { ApiServiceService } from './models/api-service.service';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { MatGridListModule } from '@angular/material/grid-list';
import { LocationListComponent } from './location/location-list/location-list.component';
import { AddLocationComponent } from './location/add-location/add-location.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuditorListComponent } from './Auditor/auditor-list/auditor-list.component';
import { AddAuditorComponent } from './Auditor/add-auditor/add-auditor.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    SideBarComponent,
    BusinessListComponent,
    AddBusinessComponent,
    LocationListComponent,
    AddLocationComponent,
    PageNotFoundComponent,
    AuditorListComponent,
    AddAuditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    RouterModule.forRoot(route),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
  ],
  providers: [AuthGuard, ApiServiceService, 
    { provide : HTTP_INTERCEPTORS, useClass : AuthInterceptorInterceptor,
      multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
