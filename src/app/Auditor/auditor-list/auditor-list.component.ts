import { UserModel } from './../../models/model';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/models/api-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auditor-list',
  templateUrl: './auditor-list.component.html',
  styleUrls: ['./auditor-list.component.css'] 
})
export class AuditorListComponent implements OnInit {

  @Output() editDate: EventEmitter<any> = new EventEmitter<any>;
  dataSource !: MatTableDataSource<any>;
  formFilter !: FormGroup;
  tableColumns : (keyof UserModel)[] = ["userId", "businessName", "locationName", "mobile", "email", "firstName", "middleName", "lastName", "action"]
  filterValue: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private fb : FormBuilder, private api : ApiServiceService, private router: Router) {}
  ngOnInit(): void {
    this.getAuditorDetails(1005);
    this.formFilter = this.fb.group({
      filterValue : this.fb.control('')
    })
  }

  getAuditorDetails(data :any) {
    this.api.getUsersDetails(data).subscribe((res : any) => {
      if(res.status === 1 && res.msg === "SUCCESS") {
        this.dataSource = new MatTableDataSource(res.data[0].details);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        alert("Data not fetched");
      }
    });
  }

  updateAuditor(data: any) {
    this.editDate.emit(data);
    this.router.navigate(['/add-auditor']);
  }

  applyFilter() {
    this.filterValue = this.formFilter.value.filterValue;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
