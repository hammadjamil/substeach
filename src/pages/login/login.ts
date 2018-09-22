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
import { AppSettings } from '../../app/appSettings';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Services, Auth, MyTools],
})
export class LoginPage {
   //Class Properties
   user = { username: '', password: '' };
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
              public fb: Facebook,
              public google: GooglePlus,
              public tools: MyTools,
              private alertCtrl: AlertController) {
                //initializing facebook
    // this.fb.browserInit(476300759536162, "v2.10");
    
                
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
        
      this.services.login(this.user).subscribe(
        //Successfully Logged in
        success => {
          console.log('success bhai', success);
          this.auth.loginUser(success);
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
  //Facebook Login
  fbSignIn() {
    this.fb.logout().then(
        (success) => {
            console.log(success);
            this.facebookLogin();
        }
    ).catch(e => {
        console.log('Error logging into Facebook %O', e);
        this.facebookLogin();
    });
    let str = {
        asdfasdf: 'asdfasdfasdf'
    };

  }

  //Google Login
  googlePlusLogin() {
    this.google.logout().then(
        (success) => {
            this.googleLogin();
        },
        (err) => {
          
            console.log(err);
            this.googleLogin();
        }
    )
  }

  facebookLogin() {
    this.fb.login(['public_profile', 'email'])
        .then(
        (res: FacebookLoginResponse) => {
            let userId = res.authResponse.userID;
            let accessToken = res.authResponse.accessToken;
            let params = new Array<string>();
            //Getting name and gender properties
            this.fb.api("/me?fields=name,gender,first_name,last_name,email,location,picture", params).then(
                (success) => {
                    console.log('facebook user data is ', success);
                    success.social_type = 'facebook';
                    success.userID = success.id;
                    success.social_id = success.id;
                    this.registerViaSocial(success);
                },
                (err) => {
                    console.log('err is ', err);
                }
            )
            console.log('Logged into Facebook!', res);
        })
        .catch(e => {
            console.log('Alert! logging into Facebook %O', e);
        });
    }

    googleLogin() {
        this.google.login({
            // 'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            'webClientId': AppSettings.GOOGLE_WEB_CLIENT_ID, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            'offline': true
        }).then(
            (success) => {
              console.log('googleplus success : ',success);
              
                let user = {
                    //success.displayName.split(' ');
                    first_name: success.displayName.split(' ')[0],
                    last_name: success.displayName.split(' ')[1],
                    email: success.email,
                    userID: success.userId,
                    idToken: success.idToken,
                    social_type: 'google',
                    social_id: success.userId,
                    imageUrl: success.imageUrl
                }
                console.log('success is user ', user);
                this.registerViaSocial(user);
            },
            (err) => {
                console.log('error is ', err);
            }
            )
    }



    //Register step for social login 
    registerViaSocial(user) {
      this.showLoader();
      console.log('registerViaSocial recieved the data', user);
      
      user.imageUrl = user.imageUrl || '';
      user.socialLogin = 1;

      let body = new FormData();
      body.append('social_type', user.social_type);
      body.append('social_id', user.userID);
      body.append('email', user.email);

      this.services.socialUserExist(body).subscribe(
          success => {
              console.log('fb success ++++',success);
              if(success.userData!=''){
                this.auth.loginUser(success);
                setTimeout(() => {
                  this.loader.dismiss();
                  this.navCtrl.setRoot(HomePage);
                  this.loader.dismiss();
                }, 2000);
              }else{
                this.storage.set('SocialRegisteration', user);
               this.registerpage();
               this.loader.dismiss();
              }
              
          },
          err => {
              console.log('error ++++');
              this.loader.dismiss();
              // this.sendDataToParent(user);
          }
      )
  }

  


}
