import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/models/api-service.service';
import { BusinessModel } from 'src/app/models/model';
import { AddBusinessComponent } from '../add-business/add-business.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  business : BusinessModel = new BusinessModel;
  dataSource !: MatTableDataSource<any>;

  actionBtn = "Save";

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  tableColumns : (keyof BusinessModel)[] = ["businessId", "businessName", "businessLegalName", "mobile", "email", "GSTIN", "address", "city", "state", "country", "zipCode", "action"];
  constructor(private api : ApiServiceService, private dialog: MatDialog, private loader: NgxUiLoaderService) {}

  ngOnInit(): void {
    this.loader.start();
    this.getBusinessDetails();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getBusinessDetails() {
    this.loader.start();
    this.api.getBusinessDetails().subscribe((res : any) => {
      if (res.status === 1 && res.msg === "SUCCESS") {
        this.dataSource = new MatTableDataSource(res.data[0].details);
        // console.log(this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      } else {
        console.error("Failed to authenticate user");
      }
    }, error => {
      console.error(error);
    });
  }

  openDialog(id : any){
    this.dialog.open(AddBusinessComponent, {
      width: '700px',
      height: '550px',
      data : {
        id : id
      }
    }).beforeClosed().subscribe(res => {
      this.getBusinessDetails();
    });
  }

  deleteBsuiness(businessId : any) {
    this.api.deleteBusiness(businessId).subscribe((res : any) => {
      if(res.status === 1 && res.msg === 'SUCCESS') {
        alert('Business deleted successfully');
        window.location.reload();
      } else {
        alert("data not deleted");
      }
    });
  }
  
}
