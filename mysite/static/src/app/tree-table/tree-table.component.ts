import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.css']
})
export class TreeTableComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor() { }

  ngOnInit(): void {
  }

  addDB() {
    
  }
  
  addTable() {
    
  }
  
  dropDB() {
    
  }

  dropTable() {
    
  }

  downloadDB() {
    
  }

}
