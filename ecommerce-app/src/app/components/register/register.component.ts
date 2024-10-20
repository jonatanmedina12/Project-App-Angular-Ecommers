import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword = true;
  loading = false;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(2)]],
    }, { validators: this.checkPasswords });
  }

  ngOnInit(): void {}

  checkPasswords(group: FormGroup): {[key: string]: any} | null {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      const userData = {
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value,
        email: this.registerForm.get('email')?.value,
      };
      this.authService.registerUser(userData).subscribe({
        next: (response) => {
          this.snackBar.open('Usuario registrado con éxito', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          if (error.emailExists) {
            this.registerForm.get('email')?.setErrors({ emailExists: true });
            this.snackBar.open(error.emailExists, 'Cerrar', { duration: 5000 });
          } else {
            this.snackBar.open('Error al registrar usuario', 'Cerrar', { duration: 3000 });
          }
          console.error('Error de registro:', error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}
