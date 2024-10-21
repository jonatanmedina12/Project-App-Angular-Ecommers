import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  profileForm: FormGroup;
  userPhotoUrl: string = 'assets/default-profile.png'; // URL por defecto
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.pattern('^[0-9]{10}$')]
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    
  }

  onSubmit() {
    
  }

  onFileSelected(event: Event) {
   
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  resetForm() {
    this.loadUserProfile();
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}
