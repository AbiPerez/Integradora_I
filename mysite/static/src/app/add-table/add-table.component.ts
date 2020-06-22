import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { TreeTableService } from '../services/tree-table.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent implements OnInit {

  db: string;
  file: File;
  name: string;
  nameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher(); s

  constructor(private service: TreeTableService, public dialogRef: MatDialogRef<AddTableComponent>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
    this.name = files.item(0).name;
  }

  addTable() {
    let id;
    let list = document.cookie.split(';');
    for (const iterator of list) {
      let item = iterator.split('=');
      if (item[0].trim() == 'id') {
        id = Number.parseInt(item[1]);
      }
    }
    if (this.file != null) {
      this.service.addTableService(this.file, id, this.db, this.name);
      this.onNoClick();
    }
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
