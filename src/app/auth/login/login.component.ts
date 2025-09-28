import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/user';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginError: string = "";
  // Definimos loginForm con el tipo correcto (FormGroup)
  loginForm: FormGroup; 
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private LoginService: LoginService // Manteniendo la mayúscula inicial según tu código
  ) {
    this.loginForm = this.formBuilder.group({
      // NOTA: Para probar validaciones, es mejor dejar los campos vacíos al inicio.
      // email: ['', [Validators.required, Validators.email]], 
      // password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void { }

get email(): AbstractControl {
  return this.loginForm.get('email')!;
}

get password(): AbstractControl {
  return this.loginForm.get('password')!;
}


  // Nuevo método para depurar errores detallados
  private debugFormErrors() {
    console.group("DEBUG: Errores del Formulario de Login");
    
    if (!this.loginForm) {
      console.error("El formulario (this.loginForm) es null o undefined.");
      console.groupEnd();
      return;
    }

    // Reporta el estado general del formulario
    console.warn(`Estado general: ${this.loginForm.status}. Inválido: ${this.loginForm.invalid}`);

    // Itera sobre CADA control individual para encontrar la causa
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      
      if (control) {
        console.log(`Campo: ${key}`);
        console.log(`  > Estado: ${control.status} (Válido: ${control.valid})`);
        console.log(`  > Tocado (Touched): ${control.touched}`);
        
        if (control.errors) {
          console.error(`  > ERRORES DETECTADOS:`, control.errors);
        }
      }
    });

    console.groupEnd();
  }

  // Mantenemos el nombre del método 'login()'
  login() { 
    if (this.loginForm.valid) {
      this.LoginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
          this.router.navigateByUrl('/inicio/dashboard'); 
          this.loginForm.reset();
        },
        error: (error) => {
          console.error(error);
          this.loginError = error.message;
        }
      });

    } else {
      // Si el formulario NO es válido:
      this.loginForm.markAllAsTouched();
      
      // Llama a la función de debugging detallada
      this.debugFormErrors(); 
      
      // Muestra un mensaje de error genérico al usuario (¡Sin alerts!)
      this.loginError = "Por favor, complete los campos correctamente.";
      console.error('El formulario no es válido. La información detallada de los errores está en el grupo "DEBUG".');
    }
  }
}
