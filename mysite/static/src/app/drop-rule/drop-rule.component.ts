import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropRuleService } from '../services/drop-rule.service';

@Component({
  selector: 'app-drop-rule',
  templateUrl: './drop-rule.component.html',
  styleUrls: ['./drop-rule.component.css']
})
export class DropRuleComponent implements OnInit {
  rules;
  idUser;
  dbName;
  tableName;
  matcher = new MyErrorStateMatcher();

  ruleToDrop: string;
  ruleToDropFormControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<DropRuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private service: DropRuleService) {
    this.rules = data.rules;
    this.idUser = data.id;
    this.dbName = data.db;
    this.tableName = data.table;
  }

  ngOnInit(): void {
  }

  dropRule(): void {
    // this.service.addColumnService(this.dbName, this.tableName, this.nameAddColumn, this.idUser,
    //   this.firstSelectedAddColumn, this.secondSelectedAddColumn, this.operationSelectedAddColumn);
    this.onNoClick();
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
