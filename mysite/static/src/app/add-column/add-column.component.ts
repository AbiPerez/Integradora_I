import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddColumnService } from '../services/add-column.service';

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.css']
})
export class AddColumnComponent implements OnInit {

  displayedColumns;
  idUser;
  dbName;
  tableName;
  matcher = new MyErrorStateMatcher();
  nameAddColumn: string = '';
  nameAddColumnFormControl = new FormControl('', [Validators.required]);
  firstSelectedAddColumn: string = '';
  firstSelectedAddColumnFormControl = new FormControl('', [Validators.required]);
  secondSelectedAddColumn: string = '';
  secondSelectedAddColumnFormControl = new FormControl('', [Validators.required]);
  operationSelectedAddColumn: string = '';
  operationSelectedAddColumnFormControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<AddColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private service: AddColumnService) {
    this.displayedColumns = data.columns;
    this.idUser = data.id;
    this.dbName = data.db;
    this.tableName = data.table;
  }

  ngOnInit(): void {
  }

  addColumn(): void {
    if (this.nameAddColumn != '')
      if (this.firstSelectedAddColumn != '')
        if (this.secondSelectedAddColumn != '')
          if (this.operationSelectedAddColumn != '') {
            this.service.addColumnService(this.dbName, this.tableName, this.nameAddColumn, this.idUser,
              this.firstSelectedAddColumn, this.secondSelectedAddColumn, this.operationSelectedAddColumn);
            this.onNoClick();
          }
          else
            this.nameAddColumnFormControl.hasError('required')
        else
          this.firstSelectedAddColumnFormControl.hasError('required')
      else
        this.secondSelectedAddColumnFormControl.hasError('required')
    else
      this.operationSelectedAddColumnFormControl.hasError('required')
  }

  onNoClick(): void {
    this.dialogRef.close('ok');
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
