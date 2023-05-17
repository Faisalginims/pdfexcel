import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Document {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.css']
})
export class DialogContentExampleDialogComponent implements OnInit {
  downloadType: any;
  documents: Document[] = [
    { value: 'PDF-0', viewValue: 'PDF' },
    { value: 'EXCEL-1', viewValue: 'EXCEL' },
  ];
  public column!: FormGroup;
  excludeColumnNameWithDownloadType: any;
  
  constructor(private _formBuilder: FormBuilder) {
    this.column = this._formBuilder.group({
      id: false,
      country: false,
      index: false,
      capital: false,
      downloadType: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.column.valueChanges.subscribe({
      next: (value) => {
        this.excludeColumnNameWithDownloadType = value;
        console.log(this.excludeColumnNameWithDownloadType);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

