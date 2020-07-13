import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ang';

  isLoged: boolean = false;
  id: number = null;
  activeTables: string = '';
  activeDb: string = '';

  constructor(private _snackBar: MatSnackBar) {
    this.checkLoged()
  }

  checkLoged() {
    if (this.isLoged == false) {
      let list = document.cookie.split(';');
      for (const iterator of list) {
        let item = iterator.split('=');
        if (item[0].trim() == 'id')
          if (item[1] != '')
            this.id = Number.parseInt(item[1]);
      }
      if (this.id != null) {
        this.isLoged = true;
        this.openSnackBar('Welcome you are logged!', this._snackBar);
      }
      else
        this.isLoged = false;
    }
  }

  logOut() {
    document.cookie = 'id=';
    this.isLoged = false;
    this.id = null;
  }

  private openSnackBar(message: string, snackBar: MatSnackBar) {
    snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  receiveTableActive($event) {
    this.activeTables = $event;
  }
  
  receiveDbActive($event) {
    this.activeDb = $event;
  }

}
