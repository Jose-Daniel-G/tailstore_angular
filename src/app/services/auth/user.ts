// Interfaces para Login/Registro
export interface LoginRequest { email: string; password: string; name?: string; lastName?: string; }
export interface RegisterRequest { email: string; password: string; name?: string; lastName?: string; }

// Interfaz principal de Usuario
export interface User {
  id: number;
  name?: string;
  lastName?: string;
  email: string;
  password?: string;
  message?: string;
}
