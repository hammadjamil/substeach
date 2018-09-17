import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { AlertController ,Events} from 'ionic-angular';
import { LoadingController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyStorage } from '../../app/localstorage';
import { Auth } from '../../providers/auth';
import { MyTools } from '../../providers/tools';
import { Services } from '../../providers/services';
import { RegisterPage } from '../register/register';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { HomePage } from '../home/home';
import { RegistrationchoicePage } from '../registrationchoice/registrationchoice';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Services, Auth, MyTools],
})
export class LoginPage {
   //Class Properties
   user = { username: '', password: '', udid: '',platform:'' };
   loader: any;
   rootPage: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public services: Services,
              private menu: MenuController,
              public platform: Platform,
              public splashScreen: SplashScreen,
              public events: Events,
              private auth: Auth,
              private storage: MyStorage,
              
              public tools: MyTools,
              private alertCtrl: AlertController) {
                
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Forgotpswdpage(){
    this.navCtrl.push(ForgotpasswordPage);    
  }

    //Show Loader
    showLoader() {
      this.loader = this.tools.getLoader();
      this.loader.present();
    }

//Login
loginService() {
  this.showLoader();
  //Applying Validations
  if (this.user.username == '') {
    this.presentAlert('Alert!', 'Please enter your email or username');
    this.loader.dismiss();
    return;
  }
  else if (this.user.password == '') {
    this.presentAlert('Alert!', 'Please enter your password');
    this.loader.dismiss();
    return;
  }
   
  //Requesting API 
  else {

    this.storage.get('deviceID').then((val) => {
      console.log('device ID',val);
      
        this.user.udid = val;
        this.storage.get('devicePlatform').then((val) => {
          this.user.platform = val;
          this.services.login(this.user).subscribe(
            //Successfully Logged in
            success => {
              console.log('success bhai', success);
              this.auth.loginUser(success.data);
              this.auth.setUserImage(success.data.profile_image);
              setTimeout(() => {
                this.loader.dismiss();
                this.navCtrl.setRoot(HomePage);
              }, 2000);
    
            },
            error => {
              this.loader.dismiss();
              console.log('error bhai', error);
              this.presentAlert('Alert!', error.data);
            }
          )
        });
    });
  }
}

  registerpage(){
    // this.navCtrl.push(RegisterPage);
    this.navCtrl.push(RegistrationchoicePage);
  }
  logintest(){
    this.navCtrl.setRoot(HomePage);
  }

  presentAlert(title1,msgs) {
    let alert = this.alertCtrl.create({
      title: title1,
      message: msgs,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  //Login
  // login() {
  //   this.spin = 1;
  //   this.disableButton = true;
  //   //Applying Validations
  //   if (this.user.password == '' && this.user.username == '') {
  //     this.splashScreen.hide();
  //     this.spin = 0;
  //     setTimeout(() => {
  //       this.presentAlert('Alert!', 'Please enter your login information.');
  //       this.disableButton = false;
  //     }, 1000);
  //     return;
  //   }
  //   else if (this.user.password == '') {
  //     this.splashScreen.hide();
  //     this.spin = 0;
  //     setTimeout(() => {
  //       this.presentAlert('Alert!','Please enter your password.');
  //       this.disableButton = false;
  //     }, 1000);
  //     return;
  //   }
  //   else if (this.user.username == '') {
  //     this.splashScreen.hide();
  //     this.spin = 0;
  //     setTimeout(() => {
  //       this.presentAlert('Alert!', 'Please enter your email/username.');
  //       this.disableButton = false;
  //     }, 1000);
  //     return;
  //   }
  //   //Requesting API 
  //   else {
  //     let body = new FormData();
  //     body.append('Username', this.user.username);
  //     body.append('Password', this.user.password);
  //     this.storage.get('deviceID').then((val) => {
  //       this.user.udid = val;
  //       this.storage.get('devicePlatform').then((val) => {
  //         this.user.platform = val;
  //         this.services.login(this.url, body).subscribe(
  //           //Successfully Logged in
  //           success => {
  //             console.log('hamzaaaaaaa login success', success);
  //             console.log('iddddd', success.ID)
  //             this.storage.set('userid', success.ID);
  //             // this.storage.set('passwordd', this.user.password);
  //             this.services.getuserdata(success.ID).subscribe(
  //               success => {
                    
  //                 // this.updateprofileinfo.emit(success);
  //                 console.log('hamza data', success);
  //                 this.storage.set('thumbnail', success.data.thumbnail);
  //                 this.storage.set('dollaramount', success.data.dollarAmount);
  //                 this.storage.set('pixxamount', success.data.pixxAmount);
  //                 this.storage.set('username', success.data.username);
  //                 this.storage.set('passwordd', this.user.password);
  //                 setTimeout(() => {                  
  //                 this.events.publish('user:login');
  //                   }, 500);
  //               },
  //               err => {
  //                 console.log('error', err);
  //               }
  //             )
  //             setTimeout(() => {
  //             }, 500);
  //             setTimeout(() => {
  //               this.spin = 0;
  //               this.disableButton = false;
  //               this.navCtrl.setRoot(HomePage,{fromlogin: 'l'});
  //             }, 2000);
  //           },
  //           error => {
  //             this.splashScreen.hide();
  //             this.spin = 0;
  //             console.log('error bhai', error);
  //             setTimeout(() => {
  //               this.presentAlert('Alert!', error.message);
  //               this.disableButton = false;
  //             }, 500);
  //           }
  //         )
  //       });
  //     });
  //   }
  // }
}
