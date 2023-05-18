import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { DialogContentExampleDialogComponent } from './../dialog-content-example-dialog/dialog-content-example-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  fileName = 'ExcelSheet.xlsx';
  tableData: any;
  searchText: string = "";
  constHideColumns: any[] = [];

  columnDefinitions = [
    { def: 'id', label: 'ID', hide: false },
    { def: 'country', label: 'country', hide: false },
    { def: 'index', label: 'index', hide: false },
    { def: 'capital', label: 'capital', hide: false },
  ];
  constructor(public dialog: MatDialog) {
    this.tableData =[
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
    ]
  }
  ngOnInit(): void {


  }
  getDisplayedColumns() {
    const col = this.columnDefinitions
      .filter((cd) => !cd.hide)
      .map((cd) => cd.def);
    return (this.constHideColumns = [col]);
  }

  getDisplayedExcel() {
    return this.columnDefinitions.filter((cd) => !cd.hide).map((cd) => cd.def);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      width: '70%',
      height: '50%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.hideColumns(result);
      this.printTable(result.downloadType);
    });
  }
  
  printTable(exportType: string) {
    const filteredData = this.getFilteredData();
    if (exportType === 'PDF') {
      this.exportPdf(filteredData);
    } else if (exportType === 'EXCEL') {
      this.exportXlsx();
    }
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
  getFilteredData() {
    return this.tableData.filter((data: any) => {
      const s = `${data.id} ${data.country} ${data.index} ${data.capital}`
      return s.toLowerCase().includes(this.searchText.toLowerCase())
    }).map((data: any) => {
      const row: string[] = Object.values(data);
      console.log(row
      );

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
