import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { AddDbComponent } from '../add-db/add-db.component';
import { TreeTableService } from '../services/tree-table.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.css']
})
export class TreeTableComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(public dialog: MatDialog, public service: TreeTableService) { }

  ngOnInit(): void {
  }

  addDB() {
    const dialogRef = this.dialog.open(AddDbComponent, {
      width: '400px',
    });
  }

  addTable() {

  }

  dropDB(name:string) {
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
        let id;
        let list = document.cookie.split(';');
        for (const iterator of list) {
          let item = iterator.split('=');
          if (item[0].trim() == 'id') {
            id = Number.parseInt(item[1]);
          }
        }
        this.service.dropDbService(name,id)
      }
    })
  }

  dropTable() {

  }

  downloadDB() {

  }

}
