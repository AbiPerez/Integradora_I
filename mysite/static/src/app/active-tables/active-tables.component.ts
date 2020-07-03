import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActiveTablesService } from '../services/active-tables.service';

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

  constructor(private service: ActiveTablesService) {
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

}