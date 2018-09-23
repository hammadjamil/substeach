import { Component } from '@angular/core';
import { IonicPage, NavController , NavParams, MenuController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Services } from '../../assets/providers/services';
import { LoginPage } from '../login/login';
import { Schoolregister2Page } from '../schoolregister2/schoolregister2';
/**
 * Generated class for the Schoolregister1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schoolregister1',
  templateUrl: 'schoolregister1.html',
})
export class Schoolregister1Page {
  emailcheck:boolean;
  spin: any = 0;
  minDate:any;
  ageconfirm:any;
  termcondition:any;
  disableButton;
  user: any = 
  { 
      
      "SchoolName": "",
      "Details": "",
      "VisitingAddress1": "",
      "VisitingAddress2": "",
      "VisitingCity": "",
      "VisitingCountry": "",
      "VisitingPostalCode": "",
      "GovtIssuedID": "",
      "SchoolType": '',
      // "LogoPath": "",
      // "BillingAddress1": "",
      // "BillingAddress2": "",
      // "BillingCity": "",
      // "BillingPostalCode": "",
      // "BillingCountry": "",
      // "AgreeOnTermsAndConditions": true,
      // "bisDeleted": true,
      // "DeletedDate": "",
      // "userId": "",
      // "JavascriptToRun": ""
    
    // "users": {
    //   "Email": "",
    //   "EmailConfirmed": true,
    //   "PasswordHash": "",
    //   "SecurityStamp": "",
    //   "PhoneNumber": "",
    //   "PhoneNumberConfirmed": true,
    //   "TwoFactorEnabled": true,
    //   "LockoutEndDateUtc": "2018-09-15T12:12:55.908Z",
    //   "LockoutEnabled": true,
    //   "AccessFailedCount": 0,
    //   "UserName": ""
    // },"documents": {
    //   "DocumentsId": "00000000-0000-0000-0000-000000000000",
    //   "DocumentsUrl": "string",
    //   "DocumentsDetails": "string",
    //   "DocumentTypeId": 0,
    //   "userId": "string"
    // } 
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

  RegisterStepOne(){
    this.showLoader();
    //Applying Validations
    if (this.user.SchoolName == '') {
      this.presentAlert('Alert!', 'Please enter your SchoolName');
      this.loader.dismiss();
      return;
    }
    else if (this.user.VisitingAddress1 == '') {
      this.presentAlert('Alert!', 'Please enter your VisitingAddress1');
      this.loader.dismiss();
      return;
    }
    else if (this.user.VisitingAddress2 == '') {
      this.presentAlert('Alert!', 'Please enter your VisitingAddress2');
      this.loader.dismiss();
      return;
    }
    else if (this.user.VisitingCity == '') {
      this.presentAlert('Alert!', 'Please enter your Visiting City');
      this.loader.dismiss();
      return;
    }
    else if (this.user.VisitingPostalCode == '') {
      this.presentAlert('Alert!', 'Please enter your Visiting Postal Code');
      this.loader.dismiss();
      return;
    }
    else if (this.user.VisitingCountry == '') {
      this.presentAlert('Alert!', 'Please enter your Visiting Country');
      this.loader.dismiss();
      return;
    }
    else if (this.user.GovtIssuedID == '') {
      this.presentAlert('Alert!', 'Please enter your Govt Issued ID');
      this.loader.dismiss();
      return;
    }
    else if (this.user.SchoolType == '') {
      this.presentAlert('Alert!', 'Please enter School Type  ');
      this.loader.dismiss();
      return;
    }
    
    console.log('setting this user data ',this.user);
    this.storage.set('RegisterSchoolStepOne', this.user);
    this.loader.dismiss();
    this.schoolregister2();
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
      <img src = "./assets/imgs/loader2.gif">
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
 
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  loginpage(){
    this.navCtrl.push(LoginPage);
  }
  schoolregister2(){
    this.navCtrl.push(Schoolregister2Page);
  }
  backtologin(){
    this.navCtrl.push(LoginPage);
  }
  skip(){
    this.navCtrl.push(Schoolregister2Page);
  }
}
