import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-active-tables',
  templateUrl: './active-tables.component.html',
  styleUrls: ['./active-tables.component.css']
})
export class ActiveTablesComponent implements OnInit, OnChanges {

  @Input()
  activeTables: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.activeTables);
  }

}
