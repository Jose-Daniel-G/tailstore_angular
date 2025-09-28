import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, User } from './user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: 0,
    email: '',
  });

  constructor(private http: HttpClient) { this.initializeDefaultUser(); }

  private initializeDefaultUser() {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      const defaultUser: User = {
        id: 1,
        name: 'Jose',
        lastName: 'Grijalba',
        email: 'jose@gmail.com',
        password: '12345678', // <--- contraseña por defecto
        message: 'Autenticación ok'
      };
      localStorage.setItem('users', JSON.stringify([defaultUser]));
    }
  }

login(credentials: LoginRequest) {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(
    u => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) return throwError(() => new Error('Usuario o contraseña incorrectos'));

  this.currentUserData.next(user);
  this.currentUserLoginOn.next(true);
console.log("Usuario logueado:", user);
  return of(user);
}




  register(credentials: RegisterRequest): Observable<User> {
    return new Observable<User>((observer) => {
      try {

        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');// Obtener usuarios existentes
        const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;// Crear ID consecutivo

        const newUser: User = { // Crear nuevo usuario
          id: nextId,
          email: credentials.email,
          name: credentials.name || '',
          lastName: credentials.lastName || '',
          password: credentials.password, // <--- guardar contraseña
          message: 'Autenticación ok'
        };

        users.push(newUser); // Guardar en localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Actualizar BehaviorSubject
        this.currentUserData.next(newUser);
        this.currentUserLoginOn.next(true);

        observer.next(newUser);
        observer.complete();
      } catch (err) {
        observer.error(err);
      }
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error capturado en handleError:', error); // Esto imprime todo el objeto de error
    if (error.status === 0) {
      console.log('Se ha producido un error: ', error.error);
    } else {
      console.log(
        'El backend retorno el codigo de estado: ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo fallo. por favor intente nuevamente')
    );
  }
  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }
  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
