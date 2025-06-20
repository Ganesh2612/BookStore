import { Component, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroupDirective,NgForm,Validators,FormsModule,ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../../Services/http/http.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/User/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule, CommonModule, MatCardModule,MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  isLogin = true;
  showPassword = false;
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.signupForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
    });
  }

  showLogin() {
    this.isLogin = true;
  }

  showSignup() {
    this.isLogin = false;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          this.loginForm.reset();
        },
        error: (err) => console.error('Login failed:', err),
      });
    }
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.userService.register(this.signupForm.value).subscribe({
        next: (res) => {
          console.log('Signup success:', res);
          this.signupForm.reset();
        },
        error: (err) => console.error('Signup failed:', err),
      });
    }
  }
}
