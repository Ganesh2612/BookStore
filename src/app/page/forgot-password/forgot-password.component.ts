import { MatFormFieldModule } from '@angular/material/form-field';

import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import { ToolbarComponent } from '../../component/dashboard/toolbar/toolbar.component';



@Component({
  selector: 'app-forgot-password',
  standalone:true,
  imports: [MatCardModule,MatFormFieldModule,ReactiveFormsModule, ToolbarComponent],
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

  goToRegister(): void {
    alert('Redirecting to account creation...');
    // Replace with router.navigate(['/create-account']) if using routing
  }
}
