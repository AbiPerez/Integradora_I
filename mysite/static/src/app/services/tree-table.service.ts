import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Binary } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TreeTableService {

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

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

  addTableService(file: File, id: number, nameDB: string, nameTable: string) {
    let cookie = document.getElementsByName('csrfmiddlewaretoken')[0];
    let openSnackBar = this.openSnackBar;
    let checkStatus = this.checkStatus;
    let snackBar = this._snackBar;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      $.post('/db_table_add', {
        "csrfmiddlewaretoken": cookie['value'],
        "idUser": id,
        "nameDB": nameDB,
        "nameTable": nameTable,
        "fileTable": reader.result
      }, function (data) {
        let message = checkStatus(data['response']);
        openSnackBar(message, snackBar);
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };




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

  dropDbTableService(name: string, id: number, db: string) {
    let cookie = document.getElementsByName('csrfmiddlewaretoken')[0];
    let openSnackBar = this.openSnackBar;
    let checkStatus = this.checkStatus;
    let snackBar = this._snackBar;
    $.post('/db_table_drop',
      {
        "csrfmiddlewaretoken": cookie['value'],
        "idUser": id,
        "nameDB": db,
        "nameTable": name
      }, function (data) {
        let message = checkStatus(data['response']);
        openSnackBar(message, snackBar);
      });
  }

  getDbsService(id: number) {
    const params = new HttpParams({ fromString: 'idUser=' + id });
    return this.httpClient.get('/getDbs', { params });
  }

  private checkStatus(code: number) {
    switch (code) {
      case 201:
        return 'DB created successfully!';
      case 202:
        return 'DB droped successfully!';
      case 203:
        return 'Table created successfully!';
      case 204:
        return 'Table droped successfully!';
      case 501:
        return 'DB already exists!';
      case 502:
        return 'Table already exists!';
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
