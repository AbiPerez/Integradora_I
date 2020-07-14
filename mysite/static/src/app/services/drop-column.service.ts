import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Binary } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DropColumnService {

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  dropColumnService(dbName: string, tableName: string, columnName: string, idUser: number) {
    let cookie = document.getElementsByName('csrfmiddlewaretoken')[0];
    let openSnackBar = this.openSnackBar;
    let checkStatus = this.checkStatus;
    let snackBar = this._snackBar;
    $.post('/drop_column',
      {
        "csrfmiddlewaretoken": cookie['value'],
        "idUser": idUser,
        "dbName": dbName,
        "tableName": tableName,
        "columnName": columnName,
      }, function (data) {
        let message = checkStatus(data['response']);
        openSnackBar(message, snackBar);
      });
  }

  private checkStatus(code: number) {
    switch (code) {
      case 201:
        return 'Column droped successfully!';
      case 202:
        return 'Column already not exists!';
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
