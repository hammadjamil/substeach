import { Component } from '@angular/core';
import { IonicPage, NavController , NavParams, MenuController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Services } from '../../assets/providers/services';
import { LoginPage } from '../login/login';
import { Schoolregister1Page } from '../schoolregister1/schoolregister1';
import { VerifyphonePage } from '../verifyphone/verifyphone';

@IonicPage()
@Component({
  selector: 'page-schoolregister',
  templateUrl: 'schoolregister.html',
})
export class SchoolregisterPage {
  emailcheck:boolean;
  spin: any = 0;
  minDate:any;
  ageconfirm:any;
  termcondition:any;
  disableButton;
  user: any = 
  { 
    username: 'hammad', 
    email: 'hammad@gmail.com',
    confemail:'hammad@gmail.com', 
    pswd: '12345', 
    rpswd: '12345',  
    phonenumber: '923455252632', 
    confphonenumber:'923455252632' ,
    socialID:'' 
  };

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private storage: Storage,
              public services: Services,
              private alertCtrl: AlertController,
              private menu: MenuController,
              public navParams: NavParams) {
                this.storage.get('SocialRegisteration').then((val) => {
                  console.log('val',val);
                  
                  if(val!='' && val!=null){
                    this.user.username= val.first_name+val.last_name; 
                    this.user.email= val.email;
                    this.user.confemail= val.email;
                    this.user.socialID= val.userID;
                    this.storage.set('SocialRegisteration','');
                  }
                });
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
  
  RegisterUserStep(){
    this.showLoader();
    //Applying Validations
    if (this.user.username == '') {
      this.presentAlert('Alert!', 'Please enter your username');
      this.loader.dismiss();
      return;
    }
    else if (this.user.email == '') {
      this.presentAlert('Alert!', 'Please enter your email');
      this.loader.dismiss();
      return;
    }
    else if (this.user.confemail != this.user.email) {
      this.presentAlert('Alert!', 'Please match your email');
      this.loader.dismiss();
      return;
    }
    else if (this.user.pswd == '') {
      this.presentAlert('Alert!', 'Please enter your password');
      this.loader.dismiss();
      return;
    }
    else if (this.user.rpswd != this.user.pswd) {
      this.presentAlert('Alert!', 'Please match your password');
      this.loader.dismiss();
      return;
    }
    else if (this.user.phonenumber == '') {
      this.presentAlert('Alert!', 'Please enter your phone number');
      this.loader.dismiss();
      return;
    }
    else if (this.user.confphonenumber != this.user.phonenumber) {
      this.presentAlert('Alert!', 'Please confirm your phonenumber');
      this.loader.dismiss();
      return;
    }
    
    
    console.log('setting this user data ',this.user);
    this.storage.set('RegisterSchoolUserStep', this.user);
    this.loader.dismiss();
    this.verifyPhone();
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
  schoolregister2(){
    this.navCtrl.push(Schoolregister1Page);
  }
  verifyPhone(){
    this.navCtrl.push(VerifyphonePage);
  }
}
