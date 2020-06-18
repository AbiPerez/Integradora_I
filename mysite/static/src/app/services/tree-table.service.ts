import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class TreeTableService {

  constructor(private _snackBar: MatSnackBar) { }

  addDbService(name: string, id: number) {
    let cookie = document.getElementsByName('csrfmiddlewaretoken')[0];
    let openSnackBar = this.openSnackBar;
    let checkStatus = this.checkStatus;
    let snackBar = this._snackBar;
    $.post('/db_add',
      {
        "csrfmiddlewaretoken": cookie['value'],
        "idUser": id,
        "nameDB": name
      }, function (data) {
        let message = checkStatus(data['response']);
        openSnackBar(message, snackBar);
      });
  }

  dropDbService(name: string, id: number) {
    let cookie = document.getElementsByName('csrfmiddlewaretoken')[0];
    let openSnackBar = this.openSnackBar;
    let checkStatus = this.checkStatus;
    let snackBar = this._snackBar;
    $.post('/db_drop',
      {
        "csrfmiddlewaretoken": cookie['value'],
        "idUser": id,
        "nameDB": name
      }, function (data) {
        let message = checkStatus(data['response']);
        openSnackBar(message, snackBar);
      });
  }

  private checkStatus(code: number) {
    switch (code) {
      case 201:
        return 'DB created successfully!';
      case 501:
        return 'DB already exists!';
      case 202:
        return 'DB droped successfully!';
    }
  }

  private openSnackBar(message: string, snackBar: MatSnackBar) {
    snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
