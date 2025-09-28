import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component'; 

@Component({
  selector: 'app-auth-profile',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './auth-profile.component.html',
  styleUrl: './auth-profile.component.css'
})
export class AuthProfileComponent implements OnInit{
  constructor() {}

  ngOnInit(): void { 
  }
}
