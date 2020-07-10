import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.css']
})
export class AddRuleComponent implements OnInit {

  displayedColumns;
  idUser;
  dbName;
  tableName;
  matcher = new MyErrorStateMatcher();

  rule: { column: string, rule: string, fValue: string, sValue: string };
  columnToApply: string = '';
  columnToApplyFormControl = new FormControl('', [Validators.required]);
  ruleSelectedAddRule: string = '';
  ruleSelectedAddRuleFormControl = new FormControl('', [Validators.required]);
  firstValueRule: string = '';
  firstValueRuleFormControl = new FormControl('', [Validators.required]);
  secondValueRule: string = '';
  secondValueRuleFormControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<AddRuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.displayedColumns = data.columns;
    this.idUser = data.id;
    this.dbName = data.db;
    this.tableName = data.table;
  }

  ngOnInit(): void {
  }

  addRule(): void {
    if (this.columnToApply != '')
      if (this.ruleSelectedAddRule != '')
        if (this.firstValueRule != '') {
          if (this.ruleSelectedAddRule == '<>' && this.secondValueRule == '')
            this.secondValueRuleFormControl.hasError('required');
          else {
            this.rule = {
              column: this.columnToApply,
              rule: this.ruleSelectedAddRule,
              fValue: this.firstValueRule,
              sValue: this.secondValueRule
            }
            this.onNoClick();
          }
        }
        else
          this.firstValueRuleFormControl.hasError('required');
      else
        this.ruleSelectedAddRuleFormControl.hasError('required');
    else
      this.columnToApplyFormControl.hasError('required');
  }

  onNoClick(): void {
    this.dialogRef.close(this.rule);
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
