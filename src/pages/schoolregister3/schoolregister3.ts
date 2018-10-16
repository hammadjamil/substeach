import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';

import { Services } from '../../providers/services';
import { LoginPage } from '../login/login';
import { RegistrationchoicePage } from '../registrationchoice/registrationchoice';
import { SchoolprofilePage } from '../schoolprofile/schoolprofile';
import { TeacherprofilePage } from '../teacherprofile/teacherprofile';

@IonicPage()
@Component({
  selector: 'page-schoolregister3',
  templateUrl: 'schoolregister3.html'
})
export class Schoolregister3Page {
  emailcheck:boolean;
  spin: any = 0;
  minDate:any;
  ageconfirm:any;
  termcondition:any;
  disableButton;
  userPhoneNumber : any;
  logo = '';
  userlogin = { username: '', password: '', udid: '',platform:'' };
  user: any = 
  { 
      
      "BillingAddress1": "",
      "BillingAddress2": "",
      "BillingCity": "",
      "BillingPostalCode": "",
      "BillingCountry": "",
      "AgreeOnTermsAndConditions": true,
      "isAdult": true,
    
  };
  schoolDetail : any;
  userDetail: any;
   constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private storage: Storage,
              public services: Services,
              private alertCtrl: AlertController,
              private menu: MenuController,
              public navParams: NavParams,
              private auth: Auth,
              ) {
                this.storage.get('RegisterSchoolPhoneNumber').then((val) => {
                  this.userPhoneNumber = val;
                });
                this.storage.get('TeacherLogo').then((val) => {
                  if(val)
                    this.logo = val;
                });
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  ageconsole(){
    console.log('this.user.isAdult',this.user.isAdult);
    
    if(this.user.isAdult){
      this.user.isAdult = false;

    }else{
      this.user.isAdult = true;
    }
    
  }
  AgreeOnTermsAndConditions(){
    console.log('this.user.AgreeOnTermsAndConditions',this.user.AgreeOnTermsAndConditions);
    
    if(this.user.AgreeOnTermsAndConditions){
      this.user.AgreeOnTermsAndConditions = false;

    }else{
      this.user.AgreeOnTermsAndConditions = true;
    }
    
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
      <img src = "../../assets/imgs/loader2.gif">
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
      }, 500);
      return;
    }
    else if (this.user.BillingCity == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Billing City');
        this.disableButton = false;
      }, 500);
      return;
    }
    else if (this.user.BillingPostalCode == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Billing Postal Code');
        this.disableButton = false;
      }, 500);
      return;
    }
    else if (this.user.BillingCountry == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Billing Country');
        this.disableButton = false;
      }, 500);
      return;
    }
    else if (!this.user.isAdult) {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please confirm your age');
        this.disableButton = false;
      }, 500);
      return;
    }
    else if (!this.user.AgreeOnTermsAndConditions) {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please agree to our Terms and Conditions');
        this.disableButton = false;
      }, 500);
      return;
    }
    //Requesting API birthday
    else {
      this.showLoader();
      this.storage.get('RegisterSchoolUserStep').then((val) => {
        this.userDetail = val;
        this.storage.get('RegisterSchoolStepOne').then((val) => {
          this.schoolDetail = val;
          let body = new FormData();
          body.append('UserName', this.userDetail.username);
          body.append('Email', this.userDetail.email);
          body.append('EmailConfirmed', this.userDetail.confemail);
          body.append('PasswordHash', this.userDetail.pswd);
          // body.append('Rpswd', this.userDetail.rpswd);
          body.append('PhoneNumber', this.userPhoneNumber);
          body.append('PhoneNumberConfirmed', this.userPhoneNumber);
          body.append('SocialID', this.userDetail.socialID);


          body.append('SchoolName', this.schoolDetail.SchoolName);
          body.append('Details', this.schoolDetail.Details);
          body.append('GovtIssuedID', this.schoolDetail.GovtIssuedID);
          body.append('SchoolType', this.schoolDetail.SchoolType);
          body.append('VisitingAddress1', this.schoolDetail.VisitingAddress1);
          body.append('VisitingAddress2', this.schoolDetail.VisitingAddress2);
          body.append('VisitingCity', this.schoolDetail.VisitingCity);
          body.append('VisitingCountry', this.schoolDetail.VisitingCountry);
          body.append('VisitingPostalCode', this.schoolDetail.VisitingPostalCode);
          


          body.append('BillingAddress1', this.user.BillingAddress1);
          body.append('BillingAddress2', this.user.BillingAddress2);
          body.append('BillingCity', this.user.BillingCity);
          body.append('BillingCountry', this.user.BillingCountry);
          body.append('BillingPostalCode', this.user.BillingPostalCode);
          body.append('isAdult', this.user.isAdult);
          body.append('AgreeOnTermsAndConditions', this.user.AgreeOnTermsAndConditions);
          body.append('LogoPath', JSON.stringify({ "logo": this.logo }));
          
              this.services.register(body).subscribe(
                //Successfully Logged in
                success => {
                  
                  setTimeout(() => {
                    // this.presentAlert('Success!', 'You are successfully registered.');
                    setTimeout(() => {
                      this.loginService();
                      this.loader.dismiss();
                    }, 500);
                  }, 500);
                },
                error => {
                  this.spin = 0;
                  console.log('error bhai', error);
                  setTimeout(() => {
                    // if (error.message.length==1){
                      this.presentAlert('Alert!', error.message);
                      this.loader.dismiss();
                    // }
                    
                  }, 500);
                }
              )
        });
      });
    }
  }
  loginService() {
    this.userlogin.username=this.userDetail.username;
    this.userlogin.password=this.userDetail.pswd;
      this.storage.get('deviceID').then((val) => {
        this.user.udid = val;
        this.storage.get('devicePlatform').then((val) => {
          this.user.platform = val;
          this.services.login(this.userlogin).subscribe(
            //Successfully Logged in
            success => {
              console.log('success bhai', success);
              this.auth.loginUser(success);
              setTimeout(() => {
                this.loader.dismiss();
                console.log('login success',success);
                if(success.userData.Usertype=='School')
                  this.navCtrl.setRoot(SchoolprofilePage);
                else
                  this.navCtrl.setRoot(TeacherprofilePage);
              }, 500);
    
            },
            error => {
              this.loader.dismiss();
              console.log('error bhai', error);
              this.presentAlert('Alert!', error.message);
            }
          )
        });
      });
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
  back(){
    this.navCtrl.pop();
  }
  skip(){
    this.navCtrl.push(Schoolregister3Page);
  }
}
