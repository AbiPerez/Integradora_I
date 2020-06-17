import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _snackBar: MatSnackBar) { }

  public httpAuthUser(name: string, password: string) {
    let cookie = document.getElementsByName('csrfmiddlewaretoken')[0];
    let showSessionState = this.showSessionState;
    let openSnackBar = this.openSnackBar;
    let snackBar = this._snackBar;
    $.post('/auth',
      {
        "csrfmiddlewaretoken": cookie['value'],
        "name": name,
        "password": password
      }, function (data) {
        let message = showSessionState(data);
        if (message != 'reload')
          openSnackBar(message, snackBar);
      });
  }

  public httpCreateUser(name: string, password: string) {
    let cookie = document.getElementsByName('csrfmiddlewaretoken')[0];
    let showSessionState = this.showSessionState;
    let openSnackBar = this.openSnackBar;
    let snackBar = this._snackBar;
    $.post('/sign-in',
      {
        "csrfmiddlewaretoken": cookie['value'],
        "name": name,
        "password": password
      }, function (data) {
        let message = showSessionState(data);
        if (message != 'reload')
          openSnackBar(message, snackBar);
      });
  }

  private showSessionState(data: any) {
    switch (data['id']) {
      case 0:
        return 'Username not found or password not match!';
      case -1:
        return 'Username already exists!';
      default:
        if (data['id'] > 0) {
          document.cookie = `id=${data['id']}`;
          location.reload();
          return 'reload';
        }
        break;
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
