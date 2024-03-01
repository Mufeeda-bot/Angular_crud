import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  }

  userData: any;

  loginForm = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  
  proceedLogin() {
    if (this.loginForm.valid) {
      this.userService.Getbycode(this.loginForm.value.username).subscribe(
        (res) => {
          this.userData = res;
          console.log(this.userData);
          
          if (this.userData) {
           
            if (this.userData.password === this.loginForm.value.password) {
            
              if (this.userData.isactive) {
                
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('username', this.userData.id);
                  sessionStorage.setItem('userrole', this.userData.role);
                  this.router.navigate(['/']);
                }
                
              } else {
                this.toastr.error('Your account is inactive. Please contact the admin.');
              }
            } else {
              this.toastr.error('Invalid credentials');
            }
          } else {
            this.toastr.error('User not found');
          }
        },
        (error) => {
          console.error('Error occurred:', error);
          this.toastr.error('Error occurred while logging in. Please try again later.');
        }
      );
    } else {
      this.toastr.warning('Please enter valid credentials');
    }
  }  
}
