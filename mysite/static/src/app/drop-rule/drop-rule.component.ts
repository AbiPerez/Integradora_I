import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-drop-rule',
  templateUrl: './drop-rule.component.html',
  styleUrls: ['./drop-rule.component.css']
})
export class DropRuleComponent implements OnInit {
  rules: any[];
  rulesTrated: any[] = [];
  idUser;
  dbName;
  tableName;
  matcher = new MyErrorStateMatcher();

  ruleToDrop: number = -1;
  ruleToDropFormControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<DropRuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _snackBar: MatSnackBar) {
    let i: number = 0;
    this.rules = data.rules;
    if (data.rules.length != 0) {
      for (const item of data.rules) {
        if (item['rule'] == '<>')
          this.rulesTrated.push({
            id: i,
            text: item.column + ' between ' + item.fValue + ' to ' + item.sValue
          });
        else
          this.rulesTrated.push({
            id: i,
            text: item.column + ' ' + item.rule + ' ' + item.fValue
          });
        i++;
      }
    }
    this.idUser = data.id;
    this.dbName = data.db;
    this.tableName = data.table;
  }

  ngOnInit(): void {
  }

  dropRule(): void {
    if (this.ruleToDrop != -1) {
      let i = 0;
      let rulesFilter: any[] = [];
      for (const item of this.rules) {
        if (i != this.ruleToDrop)
          rulesFilter.push(item);
        i++;
      }
      this.rules = rulesFilter;
      this.openSnackBar('Rule droped!');
      this.onNoClick();
    }
    else
      this.ruleToDropFormControl.hasError('required');
  }

  onNoClick(): void {
    this.dialogRef.close(this.rules);
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
