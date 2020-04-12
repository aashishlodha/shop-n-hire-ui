import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo = null;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  authState = new BehaviorSubject(false);

  constructor(private router: Router, private storage: Storage, private platform: Platform) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  register(user) {
    /*const data = this.getUsersFromStorage();
    const newUsers = [];
    if (data && data['value']) {
      newUsers.concat(JSON.parse(data['value']));
    }
    newUsers.push(user);
    this.setUsersInStorage({key: 'users', value: newUsers});
    this.router.navigateByUrl('tabs/tab2');*/
  }

  login(email, password) {
    var dummy_response = {
      user_id: '007',
      user_name: 'test'
    };
    this.storage.set('USER_INFO', dummy_response).then((response) => {
      this.router.navigate(['tabs']);
      this.authState.next(true);
    });
  }

  getUserInfo() {
    return this.userInfo;
  }

  isAuthenticated() {
    return this.authState.value;
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  handleError() {
    console.error('Auth Error!!');
  }

}
