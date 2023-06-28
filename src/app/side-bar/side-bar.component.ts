
import { Component } from '@angular/core';
import { ApiServiceService } from '../models/api-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(private api: ApiServiceService){}
  isLoggedIn : boolean = false;
  logout(){
    this.api.logout()
  }

  isLogin() {
    this.isLoggedIn = this.api.isLoggedIn
  }
}
