// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;
  registerError: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // solo letras y espacios
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

    // Getter para acceder a los controles del form
  get name() { return this.registerForm.get('name')!; }
  get lastName() { return this.registerForm.get('lastName')!; }
  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }
  get password_confirmation() { return this.registerForm.get('password_confirmation')!; }

  // Validador de password
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('password_confirmation')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerError = 'Por favor completa todos los campos correctamente.';
      return;
    }

    // Obtener usuarios actuales del localStorage
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // Generar ID consecutivo
    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser: User = {
      id: nextId,
      name: this.registerForm.value.name,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
       password: this.registerForm.value.password, // <--- guardar password
    };

    // Guardar en localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.submitted = true;
    this.registerError = '';
    this.registerForm.reset();
  }
}
