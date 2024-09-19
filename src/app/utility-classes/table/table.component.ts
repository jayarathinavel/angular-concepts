import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() tableName: string = '';  // New input for table name

  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: boolean = true;

  sort(column: string) {
    this.sortDirection = this.sortColumn === column ? !this.sortDirection : true;
    this.sortColumn = column;
    this.data.sort((a, b) => {
      const res = a[column].localeCompare(b[column]);
      return this.sortDirection ? res : -res;
    });
  }

}
