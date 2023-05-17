import { DialogContentExampleDialogComponent } from './../dialog-content-example-dialog/dialog-content-example-dialog.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MultiFilterComponent } from "./../multi-filter/multi-filter.component";

interface PeriodicElement {
  id: number;
  country: string;
  index: number;
  capital: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tableDataSourceList = new MatTableDataSource<PeriodicElement>();
  fileName = 'ExcelSheet.xlsx'
  searchText: string = "";
  displayedColumns: any[] = ['id', 'country', 'index', 'capital'];
  constHideColumns: any[] = [];

  columnDefinitions = [
    { def: 'id', label: 'ID', hide: false },
    { def: 'country', label: 'country', hide: false },
    { def: 'index', label: 'index', hide: false },
    { def: 'capital', label: 'capital', hide: false }
  ]

  constructor(public dialog: MatDialog) {
    this.tableDataSourceList.data = [
      { id: 1, country: 'Finland', index: 7.632, capital: 'Helsinki' },
      { id: 2, country: 'Norway', index: 7.594, capital: 'Oslo' },
      { id: 3, country: 'Denmark', index: 7.555, capital: 'Copenhagen' },
      { id: 4, country: 'Iceland', index: 7.495, capital: 'Reykjavík' },
      { id: 5, country: 'Switzerland', index: 7.487, capital: 'Bern' },
      { id: 6, country: 'Sweden', index: 7.314, capital: 'Stockholm' },
      { id: 7, country: 'Belarus', index: 5.483, capital: 'Minsk' },
      { id: 8, country: 'Finland', index: 7.632, capital: 'Helsinki' },
      { id: 9, country: 'Norway', index: 7.594, capital: 'Oslo' },
      { id: 10, country: 'Denmark', index: 7.555, capital: 'Copenhagen' },
      { id: 11, country: 'Iceland', index: 7.495, capital: 'Reykjavík' },
      { id: 12, country: 'Switzerland', index: 7.487, capital: 'Bern' },
      { id: 13, country: 'Sweden', index: 7.314, capital: 'Stockholm' },
      { id: 14, country: 'Belarus', index: 5.483, capital: 'Minsk' },
      { id: 15, country: 'Finland', index: 7.632, capital: 'Helsinki' },
      { id: 16, country: 'Norway', index: 7.594, capital: 'Oslo' },
      { id: 17, country: 'Denmark', index: 7.555, capital: 'Copenhagen' },
      { id: 18, country: 'Iceland', index: 7.495, capital: 'Reykjavík' },
      { id: 19, country: 'Switzerland', index: 7.487, capital: 'Bern' },
      { id: 20, country: 'Sweden', index: 7.314, capital: 'Stockholm' },
      { id: 21, country: 'Belarus', index: 5.483, capital: 'Minsk' },
      { id: 22, country: 'Finland', index: 7.632, capital: 'Helsinki' },
      { id: 23, country: 'Norway', index: 7.594, capital: 'Oslo' },
      { id: 24, country: 'Denmark', index: 7.555, capital: 'Copenhagen' },
      { id: 25, country: 'Iceland', index: 7.495, capital: 'Reykjavík' },
      { id: 26, country: 'Switzerland', index: 7.487, capital: 'Bern' },
      { id: 27, country: 'Sweden', index: 7.314, capital: 'Stockholm' },
      { id: 28, country: 'Belarus', index: 5.483, capital: 'Minsk' },
      { id: 29, country: 'Finland', index: 7.632, capital: 'Helsinki' },
      { id: 30, country: 'Norway', index: 7.594, capital: 'Oslo' },
      { id: 31, country: 'Denmark', index: 7.555, capital: 'Copenhagen' },
      { id: 32, country: 'Iceland', index: 7.495, capital: 'Reykjavík' },
      { id: 33, country: 'Switzerland', index: 7.487, capital: 'Bern' },
      { id: 34, country: 'Sweden', index: 7.314, capital: 'Stockholm' },
      { id: 35, country: 'Belarus', index: 5.483, capital: 'Minsk' },
      { id: 36, country: 'Finland', index: 7.632, capital: 'Helsinki' },
      { id: 37, country: 'Norway', index: 7.594, capital: 'Oslo' },
      { id: 38, country: 'Denmark', index: 7.555, capital: 'Copenhagen' },
      { id: 39, country: 'Iceland', index: 7.495, capital: 'Reykjavík' },
      { id: 40, country: 'Switzerland', index: 7.487, capital: 'Bern' },
      { id: 41, country: 'Sweden', index: 7.314, capital: 'Stockholm' },
      { id: 42, country: 'Belarus', index: 5.483, capital: 'Minsk' }
    ];
  }

  ngOnInit() { }
  getDisplayedColumns() {
    const col = this.columnDefinitions.filter(cd => !cd.hide).map(cd => cd.def)
    return this.constHideColumns = [col]
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      width: '750px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.hideColumns(result)
      this.printTable(result.downloadType);
    });
  }
  openDialogFilter() {
    const dialogRef = this.dialog.open(MultiFilterComponent, {
      width: '50%',
      height: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  hideColumns(data: any) {
    const { id, country, index, capital } = data;
    this.columnDefinitions.map((def: any) => {
      switch (def.def) {
        case 'id':
          def.hide = id;
          break;
        case 'country':
          def.hide = country;
          break;
        case 'index':
          def.hide = index;
          break;
        case 'capital':
          def.hide = capital;
          break;
        default:
          break;
      }
    })
  }


  ngAfterViewInit(): void {
    this.tableDataSourceList.paginator = this.paginator
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSourceList.filter = filterValue.trim().toLowerCase();
  }

  printTable(exportType: string) {
    const filteredData = this.getFilteredData();
    if (exportType === 'PDF') {
      this.exportPdf(filteredData);
    } else if (exportType === 'EXCEL') {
      this.exportXlsx();
    }
  }

  getFilteredData() {
    return this.tableDataSourceList.data.filter((data: any) => {
      const s = `${data.id} ${data.country} ${data.index} ${data.capital}`
      return s.toLowerCase().includes(this.searchText.toLowerCase())
    }).map((data: any) => {
      const row: string[] = Object.values(data);
      return row;
    })
  }

  exportXlsx() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('my-table'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  exportPdf(body: any) {
    const doc = new jsPDF('l', 'mm', 'a4');
    const head = this.getDisplayedColumns()
    autoTable(doc, {
      head: head,
      body: body,
      didDrawCell: (tableDataSourceList) => { },
    });
    doc.save('table.pdf');
  }
}