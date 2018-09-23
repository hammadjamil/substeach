import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrationchoicePage } from '../registrationchoice/registrationchoice';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Services } from '../../providers/services';
/**
 * Generated class for the Teacherregister3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacherregister3',
  templateUrl: 'teacherregister3.html',
})
export class Teacherregister3Page {
  user: any = 
  { 
    FirstName: '', 
    LastName: '',
    region:'', 
    DOB: '', 
    TimeOfAvaliabilityFrom: '',  
    TimeOfAvaliabilityTo: '', 
    age:true ,
    terms:true 
  };
  disableButton;
  userDetail : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    public loadingCtrl: LoadingController,
    public services: Services,
    private alertCtrl: AlertController) {
  }
  ageconsole(){
    console.log('this.user.isAdult',this.user.age);
    
    if(this.user.age){
      this.user.age = false;

    }else{
      this.user.age = true;
    }
    
  }
  AgreeOnTermsAndConditions(){
    console.log('this.user.AgreeOnTermsAndConditions',this.user.terms);
    
    if(this.user.terms){
      this.user.terms = false;

    }else{
      this.user.terms = true;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad Teacherregister3Page');
  }
  registerchoice(){
    this.navCtrl.push(RegistrationchoicePage);
  }
  backtologin(){
    this.navCtrl.push(LoginPage);
  }
  skip(){
    this.navCtrl.push(RegistrationchoicePage);
  }


 
  RegisterStepThree() {
    if (this.user.FirstName == '') {
      // this.loader.dismiss();
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your First Name');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.LastName == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Last Name');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.region == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your region');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.DOB == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your DOB');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.TimeOfAvaliabilityFrom == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Time Of Avaliability From');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (this.user.TimeOfAvaliabilityTo == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Time Of Avaliability To');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (!this.user.age) {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please confirm your age');
        this.disableButton = false;
      }, 1000);
      return;
    }
    else if (!this.user.terms) {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please agree to our Terms and Conditions');
        this.disableButton = false;
      }, 1000);
      return;
    }
    //Requesting API birthday
    else {
      this.showLoader();
      this.storage.get('RegisterTeacherUserStep').then((val) => {
        this.userDetail = val;
        
          


          
          let body = new FormData();
          body.append('UserName', this.userDetail.username);
          body.append('Email', this.userDetail.email);
          body.append('EmailConfirmed', this.userDetail.confemail);
          body.append('PasswordHash', this.userDetail.pswd);
          // body.append('Rpswd', this.userDetail.rpswd);
          body.append('PhoneNumber', this.userDetail.phonenumber);
          body.append('PhoneNumberConfirmed', this.userDetail.confphonenumber);
          body.append('SocialID', this.userDetail.socialID);


          body.append('LogoPath', '');
         

          body.append('FirstName', this.user.FirstName);
          body.append('LastName', this.user.LastName);
          body.append('DOB', this.user.DOB);
          body.append('TimeOfAvaliabilityFrom', this.user.TimeOfAvaliabilityFrom);
          body.append('TimeOfAvaliabilityTo', this.user.TimeOfAvaliabilityTo);
          
              this.services.registerTeacher(body).subscribe(
                //Successfully Logged in
                success => {
                  setTimeout(() => {
                  }, 500);
                  setTimeout(() => {
                    this.presentAlert('Success!', 'You are successfully registered. Please login now');
                    this.loader.dismiss();
                    // this.disableButton = false;
                     this.navCtrl.push(LoginPage);
                  }, 2000);
                },
                error => {
                  console.log('error bhai', error);
                  setTimeout(() => {
                    // if (error.message.length==1){
                      this.presentAlert('Alert!', error.message[0]);
                      this.loader.dismiss();
                    // }
                    
                  }, 500);
                }
              )






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
}
