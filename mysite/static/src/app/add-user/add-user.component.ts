import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupDirective, FormControl, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  username: string = '';
  password: string = '';
  passwordConfirm: string = '';

  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordConfirmFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  matcher = new MyErrorStateMatcher();

  constructor(private service: UserService, public dialogRef: MatDialogRef<AddUserComponent>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addUser() {
    if (this.password == this.passwordConfirm) {
      if (this.username.length >= 8 && this.password.length >= 8) {
        this.service.httpCreateUser(this.username, this.password);
        this.onNoClick()
      }
      else {
        this.usernameFormControl.hasError('required');
        this.passwordFormControl.hasError('required');
      }
    } else {
      this.openSnackBar('Password not match!');
      this.passwordFormControl.hasError('required');
      this.passwordConfirmFormControl.hasError('required');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
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
