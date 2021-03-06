import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SchoolprofilePage } from '../pages/schoolprofile/schoolprofile';
import { TeacherprofilePage } from '../pages/teacherprofile/teacherprofile';
import * as firebase from 'firebase';
import { MyStorage } from './localstorage';
import { Auth } from '../providers/auth';
import { LoadingController } from 'ionic-angular/index';
import { MyTools } from '../providers/tools';
import { Services } from '../providers/services';
import { DomSanitizer } from '@angular/platform-browser';
import { RegisterrPage } from '../pages/registerr/registerr';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
@Component({
  templateUrl: 'app.html',
  providers: [Auth, Services]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // rootPage: any = LoginPage;  
  rootPage: any = RegisterrPage;  
  
  loader: any;
  pages: Array<{title: string, component: any}>;
  exitApp = 0;
  userData : any='';
  homepage:any;
  Logo:any = '';
  constructor(public toastCtrl: ToastController,
              public menuCtrl: MenuController,
              private auth: Auth,
              public tools: MyTools,
              public events: Events,
              private storage: MyStorage,
              public platform: Platform,
              public statusBar: StatusBar,
              public push: Push,
              public splashScreen: SplashScreen) 
    {
      const config = {
        apiKey: 'AIzaSyDae-aT3njQhAL3vgRlBrBA0bNsLleEovM',
        authDomain: 'YOUR_AUTH_DOMAIN',
        databaseURL: 'https://substeach-216719.firebaseio.com',
        projectId: 'substeach-216719',
        storageBucket: 'YOUR_STORAGE_BUCKET',
      };
      firebase.initializeApp(config);
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.hide();
      this.splashScreen.hide();
      if(this.platform.is('ios'))
      this.storage.set('devicePlatform', 'ios');
    else
      this.storage.set('devicePlatform', 'android');
      this.storage.get('user').then((val) => {
        if(val!='' && val!=null){
          this.userData=val;
          if(val.RoleId==6){
            this.homepage=1;
            this.rootPage = SchoolprofilePage;
          }
          else{
            this.homepage=2;
            this.rootPage = TeacherprofilePage;

          }
        }else{
          this.rootPage = RegisterrPage;
        }
      });
      if(this.platform.is('android')){
        console.log('mww tesatde');
        this.PushSetUp();
      }

      

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
      this.nav.push(RegisterrPage);
    }, 500);
  }
   //Loader 
   showLoader() {
    this.loader = this.tools.getLoader();
    this.loader.present();
  }
  presentToast(msg) {
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
  PushSetUp(){
    // to check if we have permission
    this.push.hasPermission()
    .then((res: any) => {
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }

    });
    // to initialize push notifications
    const options: PushOptions = {
    android: {
      icon : 'drawable-ldpi-icon',
      sound : true,
      vibrate : true,
      forceShow  :true,
      titleKey : 'Substeach'
    },
    ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
    },
    windows: {},
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    }
    };
    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification)
    });
    pushObject.on('registration').subscribe((registration: any) => 
    {
      console.log('vregistration : ',registration)
      this.storage.set('deviceID', registration.registrationId);
    });
    pushObject.on('error').subscribe(error => console.error('Error with Push pluginmm', error));

  }
}
