import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { Category } from './models/category.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  private categories: Category[] = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.dataService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        console.log('CATEGORIES', this.categories);
      }, (err) => {
        console.error(err);
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['tabs']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  goToCategory(category: string) {
    this.router.navigate(['tabs','tab1'], {queryParams : {cat: category}});
  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to logout of this app?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          // cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'YES',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Okay');
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
