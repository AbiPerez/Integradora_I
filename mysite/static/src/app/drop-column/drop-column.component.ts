import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropColumnService } from '../services/drop-column.service';

@Component({
  selector: 'app-drop-column',
  templateUrl: './drop-column.component.html',
  styleUrls: ['./drop-column.component.css']
})
export class DropColumnComponent implements OnInit {

  displayedColumns;
  idUser;
  dbName;
  tableName;
  matcher = new MyErrorStateMatcher();
  selectedDropColumn: string = '';
  selectedDropColumnFormControl = new FormControl('', [Validators.required],);

  constructor(public dialogRef: MatDialogRef<DropColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private service: DropColumnService) {
    this.displayedColumns = data.columns;
    this.idUser = data.id;
    this.dbName = data.db;
    this.tableName = data.table;
  }

  ngOnInit(): void {
  }

  dropColumn(): void {
    if (this.selectedDropColumn != '') {
      this.service.dropColumnService(this.dbName, this.tableName, this.selectedDropColumn, this.idUser);
      this.onNoClick();
    }
    else
      this.selectedDropColumnFormControl.hasError('required')
  }

  onNoClick(): void {
    this.dialogRef.close(this.selectedDropColumn);
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
