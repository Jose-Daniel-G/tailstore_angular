import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../core/services/carrito.service';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavComponent,CommonModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './header.component.html', 
})
export class HeaderComponent {
  public carritoService = inject(CarritoService);
  
    /// LOGIN
    userLoginOn: boolean = false;
    constructor(private loginService:LoginService){}
    ngOnDestroy(): void {
      this.loginService.currentUserLoginOn.unsubscribe();
    }
    ngOnInit(): void {
      this.loginService.currentUserLoginOn.subscribe({
        next:((userLoginOn) =>{
          this.userLoginOn = userLoginOn;
        })
      })
    }
}
