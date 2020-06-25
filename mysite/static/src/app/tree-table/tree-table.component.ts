import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { AddDbComponent } from '../add-db/add-db.component';
import { TreeTableService } from '../services/tree-table.service';
import Swal from 'sweetalert2'
import { AddTableComponent } from '../add-table/add-table.component';
import * as $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.css']
})
export class TreeTableComponent implements OnInit {

  dbs: string[];
  id: number;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(public dialog: MatDialog, public service: TreeTableService, private sanitizer: DomSanitizer) {
    let list = document.cookie.split(';');
    for (const iterator of list) {
      let item = iterator.split('=');
      if (item[0].trim() == 'id') {
        this.id = Number.parseInt(item[1]);
      }
    }
    this.showDBs();
  }

  ngOnInit(): void {
  }

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
      }
    })
  }

  dropTable(name: string, db: string) {
    this.service.dropDbTableService(name, this.id, db);
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

}
