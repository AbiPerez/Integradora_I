import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, FormControl, NgForm, Validators } from '@angular/forms';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  usernameFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private service: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  authUser() {
    if (this.username.length != 0 && this.password.length != 0) {
      this.service.httpAuthUser(this.username, this.password);
    }
    else {
      this.usernameFormControl.hasError('required');
      this.passwordFormControl.hasError('required');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
    });
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
