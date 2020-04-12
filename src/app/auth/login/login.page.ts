import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email;
  private password;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.userInfo) {
      this.router.navigate(['tabs/tab3']);
    }
  }

  login() {
    this.authService.login(this.email, this.password);
  }

}
