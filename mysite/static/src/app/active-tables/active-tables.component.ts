import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { ActiveTablesService } from '../services/active-tables.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddColumnComponent } from '../add-column/add-column.component';
import { DropColumnComponent } from '../drop-column/drop-column.component';
import { AddRuleComponent } from '../add-rule/add-rule.component';
import { DropRuleComponent } from '../drop-rule/drop-rule.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-active-tables',
  templateUrl: './active-tables.component.html',
  styleUrls: ['./active-tables.component.css']
})
export class ActiveTablesComponent implements OnInit, OnChanges {

  @Input()
  activeTables: string = '';
  @Input()
  activeDb: string = '';
  isCharging: boolean;
  id: number;
  displayedColumns = Array();
  lengthColumns = Array();
  dataSource: any[];
  rules: any[] = [];

  constructor(private service: ActiveTablesService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    let list = document.cookie.split(';');
    for (const iterator of list) {
      let item = iterator.split('=');
      if (item[0].trim() == 'id') {
        this.id = Number.parseInt(item[1]);
      }
    }
  }

  ngOnInit(): void { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.activeTables == '' || this.activeDb == '') {
      this.dataSource = [];
      this.displayedColumns = Array();
    }
    else
      this.chargeDataOnWorkSpace();
  }

  chargeDataOnWorkSpace() {
    this.isCharging = true;
    if (this.activeTables != '') {
      this.service.getTableRecordsService(this.id, this.activeTables, this.activeDb, this.rules).done(
        (data: any) => {
          this.displayedColumns = new Array();
          let i = 0;
          for (const item of data['columns']) {
            this.lengthColumns[item] = i;
            i++;
          }
          this.displayedColumns = data['columns'];
          this.dataSource = data['data'];
          this.isCharging = false;
          if (data['state'] == 505) {
            this.openSnackBar('Values of the rule was incorrect!');
            this.rules.pop();
          }
          else
            this.openSnackBar('Data succesfully loaded!');
        }
      );
    }
  }

  openAddColumnDialog(): void {
    const dialogRef = this.dialog.open(AddColumnComponent, {
      width: '350px',
      data: {
        "columns": this.displayedColumns,
        "id": this.id,
        "db": this.activeDb[0],
        "table": this.activeTables
      }
    }).afterClosed().subscribe(data => {
      this.chargeDataOnWorkSpace();
    });
  }

  openDropColumnDialog(): void {
    const dialogRef = this.dialog.open(DropColumnComponent, {
      width: '350px',
      data: {
        "columns": this.displayedColumns,
        "id": this.id,
        "db": this.activeDb[0],
        "table": this.activeTables
      }
    }).afterClosed().subscribe(data => {
      this.chargeDataOnWorkSpace();
    });
  }

  openAddRuleDialog(): void {
    const dialogRef = this.dialog.open(AddRuleComponent, {
      width: '350px',
      data: {
        "columns": this.displayedColumns,
        "id": this.id,
        "db": this.activeDb[0],
        "table": this.activeTables
      }
    }).afterClosed().subscribe(data => {
      if (data != undefined)
        this.rules.push(data);
      this.chargeDataOnWorkSpace();
    });
  }

  openDropRuleDialog(): void {
    const dialogRef = this.dialog.open(DropRuleComponent, {
      width: '350px',
      data: {
        "rules": this.rules,
        "id": this.id,
        "db": this.activeDb[0],
        "table": this.activeTables
      }
    }).afterClosed().subscribe(data => {
      if (data != undefined)
        this.rules = data;
      this.chargeDataOnWorkSpace();
    });
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}