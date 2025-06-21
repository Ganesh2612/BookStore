import { MatFormFieldModule } from '@angular/material/form-field';

import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule} from '@angular/material/card';



@Component({
  selector: 'app-forgot-password',
  imports: [MatCardModule,MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
     forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email')!;
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.email.value;
      localStorage.setItem('resetEmail', email);
      alert(`Password reset link sent to: ${email}`);
    }
  }

  goToCreateAccount(): void {
    alert('Redirecting to account creation...');
    // Replace with router.navigate(['/create-account']) if using routing
  }
}
