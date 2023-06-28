import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../models/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data : any;
  constructor(private api : ApiServiceService) {}

  ngOnInit(): void {
    this.getDashboard();
      
  }

  getDashboard() {
    this.api.getDashboardDetails().subscribe({
      next : (res : any) => {
        this.data = res;
      }, error : (err: any) => {
        console.log(err);
      }
    })
  }
}
