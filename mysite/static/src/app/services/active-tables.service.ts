import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ActiveTablesService {

  constructor() { }

  getTableRecordsService(id: number, table: string, db: string, rules) {
    if (rules.length == 0)
      rules = JSON.stringify(['noRules']);
    else  
      rules = JSON.stringify(rules);
    let cookie = document.getElementsByName('csrfmiddlewaretoken')[0];
    return $.post(
      'get_records',
      {
        "csrfmiddlewaretoken": cookie['value'],
        "idUser": id,
        "nameDB": db,
        "nameTable": table,
        "rulesToApply": rules
      }
    );
  }

}
