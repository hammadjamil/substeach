import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { FavouritesPage } from '../pages/favourites/favourites';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { SchoolprofilePage } from '../pages/schoolprofile/schoolprofile';
import { TeacherprofilePage } from '../pages/teacherprofile/teacherprofile';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { PublicprofilePage } from '../pages/publicprofile/publicprofile';
import { NotificationPage } from '../pages/notification/notification';
<<<<<<< HEAD

=======
import { ChatPage } from '../pages/chat/chat';
import * as firebase from 'firebase';
>>>>>>> b1eb440ef03f58c3a86f977df0cd944b5482255d
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
  userData : any='';
  homepage:any;
  constructor(private services: Services,
              public toastCtrl: ToastController,
              public menuCtrl: MenuController,
              private lodingctrl: LoadingController,
              private auth: Auth,
              public tools: MyTools,
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
      // setInterval(function () {
      //   this.storage.get('user').then((val) => {
      //     console.log('valss :', val );
      //     this.userData = val;
      //   });
      // }, 3000);
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Public Profile', component: PublicprofilePage },      
      { title: 'Favourites', component: FavouritesPage },
      { title: 'Notifications', component: NotificationPage },
      // { title: 'Settings', component: SchoolprofilePage },
      { title: 'Chat', component: ChatPage },
      { title: 'Logout', component: LogoutPage }
    ];
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
          if(val.Usertype=='School'){
            this.homepage=1;
            this.rootPage = SchoolprofilePage;
            this.pages = [
              { title: 'Home', component: SchoolprofilePage },   
              { title: 'Profile', component: PublicprofilePage },      
              { title: 'Favourites', component: FavouritesPage },
              { title: 'Notifications', component: NotificationPage },
              { title: 'Logout', component: LogoutPage }
            ];
          }
          else{
            this.homepage=2;
            console.log('this.homepage',this.homepage);
            this.rootPage = TeacherprofilePage;
            this.pages = [
              { title: 'Home', component: PublicprofilePage },         
              { title: 'Favourites', component: FavouritesPage },
              { title: 'Notifications', component: NotificationPage },
              { title: 'Settings', component: TeacherprofilePage },
              { title: 'Logout', component: LogoutPage }
            ];
          }
        }else{
          this.rootPage = LoginPage;
        }
      });
      if(this.platform.is('android')){
                
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
      titleKey : 'Academist'
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






  
// to check if we have permission
// this.push.hasPermission()
// .then((res: any) => {

//   if (res.isEnabled) {
//     console.log('We have permission to send push notifications');
//   } else {
//     console.log('We do not have permission to send push notifications');
//   }

// });

// to initialize push notifications

// const options: PushOptions = {
// android: {},
// ios: {
//     alert: 'true',
//     badge: true,
//     sound: 'false'
// },
// windows: {},
// browser: {
//     pushServiceURL: 'http://push.api.phonegap.com/v1/push'
// }
// };

// const pushObject: PushObject = this.push.init(options);


// pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

// pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

// pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));





}
