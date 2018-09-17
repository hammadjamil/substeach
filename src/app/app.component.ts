import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { LogoutPage } from '../pages/logout/logout';

import { MyStorage } from '../app/localstorage';
import { Auth } from '../providers/auth';
import { LoadingController } from 'ionic-angular/index';
import { MyTools } from '../providers/tools';
import { Services } from '../providers/services';
@Component({
  templateUrl: 'app.html',
  providers: [Auth, Services]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

<<<<<<< HEAD
  rootPage: any = HomePage;
  // rootPage: any = LoginPage;  

=======
  // rootPage: any = HomePage;
  rootPage: any = LoginPage;  
  loader: any;
>>>>>>> 25879da0052a18901d4be9bf8be61e390312a3ab
  pages: Array<{title: string, component: any}>;

  constructor(private services: Services,
    private lodingctrl: LoadingController, private auth: Auth,
    public tools: MyTools,private storage: MyStorage,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Favourites', component: FavouritesPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Logout', component: LogoutPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if(this.platform.is('ios'))
      this.storage.set('devicePlatform', 'ios');
    else
      this.storage.set('devicePlatform', 'android');


    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
