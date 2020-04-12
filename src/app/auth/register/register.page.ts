import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private name: string;
  private email: string;
  private password: string;
  private confirmPassword: string;

  constructor(private authService: AuthService, private router: Router) {  }

  ngOnInit() {
  }

  register() {
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password
    };
    this.authService.register(payload);
  }

}
