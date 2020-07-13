import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { AddDbComponent } from '../add-db/add-db.component';
import { TreeTableService } from '../services/tree-table.service';
import Swal from 'sweetalert2'
import { AddTableComponent } from '../add-table/add-table.component';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.css']
})
export class TreeTableComponent implements OnInit {

  @Input()
  drawer: MatDrawer;
  activeDB: string;
  activeTable: string;
  dbs: string[];
  id: number;
  isDropTable: boolean = false;

  @Output() dbActiveEvent = new EventEmitter<string>();
  @Output() tableActiveEvent = new EventEmitter<string>();
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(public dialog: MatDialog, public service: TreeTableService) {
    let list = document.cookie.split(';');
    for (const iterator of list) {
      let item = iterator.split('=');
      if (item[0].trim() == 'id') {
        this.id = Number.parseInt(item[1]);
      }
    }
    this.showDBs();
  }

  ngOnInit(): void { }

  addDB() {
    const dialogRef = this.dialog.open(AddDbComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(() => this.showDBs());
  }

  addTable(db: string) {
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '400px',
    });
    dialogRef.componentInstance.db = db;
    dialogRef.afterClosed().subscribe(() => this.showDBs());
  }

  dropDB(name: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.service.dropDbService(name, this.id)
        this.showDBs();
        if (name == this.activeDB)
          this.dbActiveEvent.emit('');
      }
    })
  }

  dropTable(name: string, db: string) {
    this.isDropTable = true;
    this.service.dropDbTableService(name, this.id, db);
    if (name == this.activeTable)
      this.tableActiveEvent.emit('');
    this.showDBs();
  }

  downloadDB(db: string) {
    this.service.getDbService(this.id, db);
  }

  showDBs() {
    let service = this.service.getDbsService(this.id);
    service.subscribe((data: any[]) => {
      this.dbs = data['response'];
    });
  }

  dbTableCheked(table_selected, db_selected) {
    if (!this.isDropTable) {
      this.activeDB = db_selected;
      this.activeTable = table_selected;
      this.dbActiveEvent.emit(db_selected);
      this.tableActiveEvent.emit(table_selected);
    }
    else
      this.isDropTable = false;
  }

}
