import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { LogoutPage } from '../pages/logout/logout';
import { Teacherregister3Page } from '../pages/teacherregister3/teacherregister3';
import { FavouritesPage } from '../pages/favourites/favourites';
import { SettingsPage } from '../pages/settings/settings';

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

  // rootPage: any = HomePage;
  rootPage: any = LoginPage;  
  loader: any;
  pages: Array<{title: string, component: any}>;
  exitApp = 0;
  constructor(private services: Services,   public toastCtrl: ToastController,
    private lodingctrl: LoadingController, private auth: Auth,
    public tools: MyTools,private storage: MyStorage,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Favourites', component: FavouritesPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Logout', component: null }
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


      this.platform.registerBackButtonAction(() => {
        
        
        if (this.nav.getActive().name == 'DashboardPage' || this.nav.getActive().name == 'SignupPage' || this.nav.getActive().name == 'LoginPage') {
          
          if (this.exitApp === 1) {
            this.platform.exitApp();
          }else {
            this.presentToast('Please press again to exit the app');
            this.exitApp++;

            setTimeout(() => {
              this.exitApp = 0;
            }, 3000)
          }
        }
        else {
          this.nav.pop();
        }

      });









      
      this.auth.userLoggedIn().then(
        (data) => {
          this.rootPage = HomePage;

        }
      ).catch((err) => {
          console.log('User Not logged in ', err);
          this.rootPage = LoginPage;
        })







    });
  }





  logout() {
    this.auth.logout();
    console.log('showing loader now');
    this.showLoader();
    this.logoutNow(this.loader);
            
  }

  logoutNow(loader) {
    setTimeout(() => {
      loader.dismiss();
      this.auth.logout();
      this.nav.push(LoginPage);
    }, 2000);
  }




   //Loader 
   showLoader() {
    this.loader = this.tools.getLoader();
    this.loader.present();
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();

  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
