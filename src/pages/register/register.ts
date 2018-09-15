import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Services } from '../../assets/providers/services';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  emailcheck:boolean;
  spin: any = 0;
  minDate:any;
  ageconfirm:any;
  termcondition:any;
  disableButton;
  user: any = { username: '', email: '', pswd: '', rpswd: '', referusername: '', socialcode: '', birthday:'' };
  url: any = 'https://staging.pixxpros.com/service/register-service';
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private storage: Storage,
              public services: Services,
              private alertCtrl: AlertController,
              private menu: MenuController,
              public navParams: NavParams) {
    this.minDate = new Date().toISOString();
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  ageconsole(){
    console.log('age check', this.ageconfirm);
    console.log('age check', this.termcondition);
  }
  presentAlert(title, msgs) {
    let alert = this.alertCtrl.create({
      title: title,
      // subTitle: msg,
      message: msgs,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  // loader
  getLoader() {
    console.log('showing loader now');
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      showBackdrop: false,
      content: `
      <div class="custom-spinner-container" style="width:30px">
      <img src = "./assets/imgs/loader.gif">
      </div>`
    });
    return loader;
  }
  loader: any;
  showLoader() {
    this.loader = this.getLoader();
    this.loader.present();
  }
  // loader
  //Login
  register() {
    this.spin=1;
    this.disableButton = true;
    //Applying Validations
    this.emailcheck=this.validateEmail(this.user.email);
    // if (this.user.email == '')
    if (this.user.username == '') {
      this.spin = 0;
      // this.loader.dismiss();
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your username');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.email == '') {
      this.spin = 0;
      // this.loader.dismiss();
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your email');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.emailcheck == false) {
      this.spin = 0;
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter valid email address');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.pswd == '') {
      console.log('service check');
      this.spin = 0;
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Password');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.rpswd == '') {
      this.spin = 0;
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Repassword');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.birthday == '') {
      this.spin = 0;
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your birthday');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.pswd != this.user.rpswd) {
      this.spin = 0;
      setTimeout(() => {
        this.presentAlert('Alert!', 'The two passwords must match');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.ageconfirm != true) {
      this.spin = 0;
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please confirm that you are over 18 years');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.termcondition != true) {
      this.spin = 0;
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please agree to PixxPros Terms and Conditions');
        this.disableButton = false;
      }, 1000);
      return;
    }
    //Requesting API birthday
    else {
      console.log('service check');
      let body = new FormData();
      body.append('Username', this.user.username);
      body.append('Email', this.user.email);
      body.append('Password', this.user.pswd);
      body.append('confirmPassword', this.user.rpswd);
      body.append('ReferrerId', this.user.referusername);
      body.append('FameCode', this.user.socialcode);
      body.append('DOB', this.user.birthday);
      body.append('Age', '1');
      body.append('TOS', '1');
      this.storage.get('deviceID').then((val) => {
        this.user.udid = val;
        this.storage.get('devicePlatform').then((val) => {
          this.user.platform = val;
          this.services.register(this.url,body).subscribe(
            //Successfully Logged in
            success => {
              console.log('hamzaaaaaaa register success');
              setTimeout(() => {
              }, 500);
              setTimeout(() => {
                this.spin = 0;
                this.presentAlert('Success!', 'You are successfully registered. Please verify your account to login.');
                this.disableButton = false;
                this.navCtrl.push(LoginPage);
              }, 2000);
            },
            error => {
              this.spin = 0;
              console.log('error bhai', error);
              setTimeout(() => {
                // if (error.message.length==1){
                  this.presentAlert('Alert!', error.message[0]);
                  this.disableButton = false;
                // }
                
              }, 500);
            }
          )
        });
      });
    }
  }


  //Validate Email using regex
  validateEmail(email) {
    console.log(email);
    var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    if (!regex.test(email)) {
      return false;
    } else {
      console.log('Valid Email');
      return true;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  loginpage(){
    this.navCtrl.push(LoginPage);
  }
}
