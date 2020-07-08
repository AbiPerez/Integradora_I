import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { ActiveTablesService } from '../services/active-tables.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddColumnComponent } from '../add-column/add-column.component';
import { DropColumnComponent } from '../drop-column/drop-column.component';
import { AddRuleComponent } from '../add-rule/add-rule.component';
import { DropRuleComponent } from '../drop-rule/drop-rule.component';

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
  rules: any[];

  constructor(private service: ActiveTablesService, public dialog: MatDialog) {
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
    this.chargeDataOnWorkSpace();
  }

  chargeDataOnWorkSpace() {
    this.isCharging = true;
    if (this.activeTables != '') {
      this.service.getTableRecordsService(this.id, this.activeTables, this.activeDb).done(
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
      console.log(data)
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
      console.log(data);
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
      console.log(data)
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
      console.log(data)
      this.chargeDataOnWorkSpace();
    });
  }

}