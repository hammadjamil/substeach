import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { LogoutPage } from '../pages/logout/logout';
import { Teacherregister3Page } from '../pages/teacherregister3/teacherregister3';
import { FavouritesPage } from '../pages/favourites/favourites';
import { SettingsPage } from '../pages/settings/settings';
import { EditprofilePage } from '../pages/editprofile/editprofile';

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
  constructor(private services: Services,
              public toastCtrl: ToastController,
              public menuCtrl: MenuController,
              private lodingctrl: LoadingController,
              private auth: Auth,
              public tools: MyTools,
              private storage: MyStorage,
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) 
    {
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
      this.statusBar.hide();
      this.splashScreen.hide();
      if(this.platform.is('ios'))
      this.storage.set('devicePlatform', 'ios');
    else
      this.storage.set('devicePlatform', 'android');
      this.storage.get('user').then((val) => {
        if(val!='' && val!=null){
          this.rootPage = HomePage;
        }else{
          this.rootPage = LoginPage;
        }
      });
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
    this.nav.setRoot(page.component);
  }
  editprofilepage(){
    this.nav.setRoot(EditprofilePage);
    this.menuCtrl.close();
  }
}
