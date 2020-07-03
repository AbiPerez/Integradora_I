import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ActiveTablesService {

  constructor() { }

  getTableRecordsService(id: number, table: string, db: string) {
    let cookie = document.getElementsByName('csrfmiddlewaretoken')[0];
    return $.post(
      'get_records',
      {
        "csrfmiddlewaretoken": cookie['value'],
        "idUser": id,
        "nameDB": db[0],
        "nameTable": table
      }
    );
  }

}
