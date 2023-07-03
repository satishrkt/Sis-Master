import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddLocationComponent } from '../add-location/add-location.component';
import { LocationModel } from 'src/app/models/model';
import { ApiServiceService } from 'src/app/models/api-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  location : LocationModel = new LocationModel();
  filterData : FormGroup;

  tableColumns : (keyof LocationModel)[] = ["locationId", "businessName", "locationName", "GSTIN", "mobile", "email", "address",  "city", "state", "country", "zipCode", "action"];
 
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  filterValue: any;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private api: ApiServiceService) { 
    this.filterData = this.fb.group({
      filterValue : []
    });
  }

  ngOnInit(): void {
    this.getLocations();      
  }

  applyFilter() {
    this.filterValue = this.filterData.value.filterValue;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id: any) {
    // const editData = this.dataSource.filteredData.values;
    const isEdit = !!id;
    this.dialog.open( AddLocationComponent, {
      width: '600px',
      height: '600px',
      data : {
        id : id,
        isEdit : isEdit,
      }
    }).beforeClosed().subscribe(res => {
      this.getLocations();
    })
  }

  getLocations() {
    this.api.getLocationDetails(null).subscribe((res: any) => {
      if(res.status === 1 && res.msg === "SUCCESS") {
        this.dataSource = new MatTableDataSource(res.data[0].details);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        alert("Data not Fetch");
      }
    }, (error) => {
      console.log(error);
    });
  }
}
