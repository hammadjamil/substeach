import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Services } from '../../assets/providers/services';
import { LoginPage } from '../login/login';
import { RegistrationchoicePage } from '../registrationchoice/registrationchoice';

/**
 * Generated class for the Schoolregister3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schoolregister3',
  templateUrl: 'schoolregister3.html',
})
export class Schoolregister3Page {
  emailcheck:boolean;
  spin: any = 0;
  minDate:any;
  ageconfirm:any;
  termcondition:any;
  disableButton;
  user: any = 
  { 
      
      "BillingAddress1": "",
      "BillingAddress2": "",
      "BillingAddress3": "",
      "BillingCity": "",
      "BillingPostalCode": "",
      "BillingCountry": "",
      "AgreeOnTermsAndConditions": true,
      "isAdult": true,
    
  };
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
  RegisterStepThree() {
    if (this.user.BillingAddress1 == '') {
      // this.loader.dismiss();
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Billing Address 1');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.BillingAddress1 == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Billing Address 2');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.emailcheck == false) {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Billing Address 3');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.BillingCity == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Billing City');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.BillingPostalCode == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Billing Postal Code');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.BillingCountry == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Billing Country');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.isAdult) {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please confirm your age');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.AgreeOnTermsAndConditions != true) {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please agree to our Terms and Conditions');
        this.disableButton = false;
      }, 1000);
      return;
    }
    //Requesting API birthday
    else {
      console.log('service check');
      // let body = new FormData();
      // body.append('Username', this.user.username);
      // body.append('Email', this.user.email);
      // body.append('Password', this.user.pswd);
      // body.append('confirmPassword', this.user.rpswd);
      // body.append('ReferrerId', this.user.referusername);
      // body.append('FameCode', this.user.socialcode);
      // body.append('DOB', this.user.birthday);
      // body.append('Age', '1');
      // body.append('TOS', '1');
      // this.storage.get('deviceID').then((val) => {
      //   this.user.udid = val;
      //   this.storage.get('devicePlatform').then((val) => {
      //     this.user.platform = val;
      //     this.services.register(this.url,body).subscribe(
      //       //Successfully Logged in
      //       success => {
      //         console.log('hamzaaaaaaa register success');
      //         setTimeout(() => {
      //         }, 500);
      //         setTimeout(() => {
      //           this.spin = 0;
      //           this.presentAlert('Success!', 'You are successfully registered. Please verify your account to login.');
      //           this.disableButton = false;
      //           this.navCtrl.push(LoginPage);
      //         }, 2000);
      //       },
      //       error => {
      //         this.spin = 0;
      //         console.log('error bhai', error);
      //         setTimeout(() => {
      //           // if (error.message.length==1){
      //             this.presentAlert('Alert!', error.message[0]);
      //             this.disableButton = false;
      //           // }
                
      //         }, 500);
      //       }
      //     )
      //   });
      // });
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
  registerchoice(){
    this.navCtrl.push(RegistrationchoicePage);
  }
  backtologin(){
    this.navCtrl.push(LoginPage);
  }
  skip(){
    this.navCtrl.push(Schoolregister3Page);
  }
}
