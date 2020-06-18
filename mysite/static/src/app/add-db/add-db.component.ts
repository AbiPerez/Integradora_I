import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { TreeTableService } from '../services/tree-table.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-add-db',
  templateUrl: './add-db.component.html',
  styleUrls: ['./add-db.component.css']
})
export class AddDbComponent implements OnInit {

  name:string;
  nameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(private service: TreeTableService, public dialogRef: MatDialogRef<AddDbComponent>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  addDB() {
    let id;
    let list = document.cookie.split(';');
      for (const iterator of list) {
        let item = iterator.split('=');
        if (item[0].trim() == 'id') {
          id = Number.parseInt(item[1]);
        }
      }
    this.service.addDbService(this.name, id);
    this.onNoClick();
  }
  
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
