import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { RegistrationchoicePage } from '../registrationchoice/registrationchoice';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Services } from '../../providers/services';
import { Auth } from '../../providers/auth';
import { SchoolprofilePage } from '../schoolprofile/schoolprofile';
import { TeacherprofilePage } from '../teacherprofile/teacherprofile';

@IonicPage()
@Component({
  selector: 'page-teacherregister3',
  templateUrl: 'teacherregister3.html',
})
export class Teacherregister3Page {
  user: any = 
  { 
    // FirstName: '', 
    // LastName: '',
    region:'', 
    DOB: '', 
    TimeOfAvaliabilityFrom: '',  
    TimeOfAvaliabilityTo: '', 
    age:false ,
    terms:false 
  };
  disableButton;
  userDetail : any;
  userPhoneNumber : any;
  frontimg : any;
  backimg : any;
  FileName : any;
  FileCode : any;
  userlogin = { username: '', password: '', udid: '',platform:'' };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     private storage: Storage,
    public loadingCtrl: LoadingController,
    public services: Services,
    private menu: MenuController,
    private auth: Auth,
    private alertCtrl: AlertController) {
      this.storage.get('RegisterTeacherPhoneNumber').then((val) => {
        this.userPhoneNumber = val;
        
      });
      this.storage.get('Front').then((val) => {
        this.frontimg = val;
      });
      this.storage.get('Back').then((val) => {
        this.backimg = val;
      });
      // this.storage.get('FileCode').then((val) => {
      //   this.FileCode = val;
      // });
      // this.storage.get('FileName').then((val) => {
      //   this.FileName = val;
      // });
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
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
  back(){
    this.navCtrl.pop();
  }
  skip(){
    this.navCtrl.push(RegistrationchoicePage);
  }
  RegisterStepThree() {
     if (this.user.region == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your region');
        this.disableButton = false;
      }, 500);
      return;
    }
    // else if (this.user.DOB == '') {
    //   setTimeout(() => {
    //     this.presentAlert('Alert!', 'Please enter your DOB');
    //     this.disableButton = false;
    //   }, 500);
    //   return;
    // }
    // else if (this.user.TimeOfAvaliabilityFrom == '') {
    //   setTimeout(() => {
    //     this.presentAlert('Alert!', 'Please enter your Time Of Avaliability From');
    //     this.disableButton = false;
    //   }, 500);
    //   return;
    // }
    // else if (this.user.TimeOfAvaliabilityTo == '') {
    //   setTimeout(() => {
    //     this.presentAlert('Alert!', 'Please enter your Time Of Avaliability To');
    //     this.disableButton = false;
    //   }, 500);
    //   return;
    // }
    else if (!this.user.age) {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please confirm your age');
        this.disableButton = false;
      }, 500);
      return;
    }
    else if (!this.user.terms) {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please agree to our Terms and Conditions');
        this.disableButton = false;
      }, 500);
      return;
    }
    //Requesting API birthday
    else {
      this.showLoader();
      this.storage.get('RegisterTeacherUserStep').then((val) => {
        this.userDetail = val;
        console.log('ddddhamza phonecheck',this.userPhoneNumber);
          let body = new FormData();
          body.append('UserName', this.userDetail.username);
          body.append('Email', this.userDetail.email);
          body.append('EmailConfirmed', this.userDetail.confemail);
          body.append('PasswordHash', this.userDetail.pswd);
          body.append('PhoneNumber', this.userPhoneNumber);
          body.append('PhoneNumberConfirmed',this.userPhoneNumber);
          body.append('SocialID', this.userDetail.socialID);
          body.append('LogoPath', '');
          body.append('FirstName', this.userDetail.FirstName);
          body.append('LastName', this.userDetail.LastName);
          body.append('DOB', '1');
          body.append('TimeOfAvaliabilityFrom', '1');
          body.append('TimeOfAvaliabilityTo','1');
          // body.append('FileCode',this.FileCode);
          // body.append('FileName',this.FileName);
              this.services.registerTeacher(body).subscribe(
                //Successfully Logged in
                success => {
                  setTimeout(() => {
                  }, 500);
                  setTimeout(() => {
                    // this.presentAlert('Success!', 'You are successfully registered.');
                      this.loginService();
                      this.loader.dismiss();
                    // this.disableButton = false;
                    //  this.navCtrl.push(LoginPage);
                  }, 500);
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
  loginService() {
    this.userlogin.username=this.userDetail.username;
    this.userlogin.password=this.userDetail.pswd;
      this.storage.get('deviceID').then((val) => {
        this.userlogin.udid = val;
        this.storage.get('devicePlatform').then((val) => {
          this.userlogin.platform = val;
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
}
