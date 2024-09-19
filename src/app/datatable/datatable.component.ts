import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  columns = ['name', 'age', 'email'];

  tables = [
    {
      name: 'User Information',
      data: [
        { name: 'John Doe', age: 25, email: 'john@example.com' },
        { name: 'Jane Smith', age: 30, email: 'jane@example.com' },
        { name: 'Jim Brown', age: 35, email: 'jim@example.com' }
      ]
    },
    {
      name: 'Employee Information',
      data: [
        { name: 'Alice Johnson', age: 28, email: 'alice@company.com' },
        { name: 'Bob Lee', age: 32, email: 'bob@company.com' },
        { name: 'Charlie Kim', age: 40, email: 'charlie@company.com' }
      ]
    }
  ];

  selectedTable = this.tables[0];

  onTableChange(event: any) {
    const selectedTableName = event.target.value;
    this.selectedTable = this.tables.find(table => table.name === selectedTableName) || this.tables[0];
  }
}
