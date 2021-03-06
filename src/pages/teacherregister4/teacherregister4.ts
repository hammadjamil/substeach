import { Component } from '@angular/core';
import { IonicPage, NavController , NavParams, MenuController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Services } from '../../assets/providers/services';
import { Teacherregister1Page } from '../teacherregister1/teacherregister1';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-teacherregister4',
  templateUrl: 'teacherregister4.html',
})
export class Teacherregister4Page {
  user: any = 
  { 
    username: '', 
    email: '',
    confemail:'', 
    pswd: '', 
    rpswd: '',  
    phonenumber: '', 
    confphonenumber:'' ,
    socialID:'' ,
    FirstName:'',
    LastName:''
  };
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public services: Services,
    private alertCtrl: AlertController,
    private menu: MenuController,
    public navParams: NavParams) {
      this.storage.get('SocialRegisteration').then((val) => {
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad Teacherregister4Page');
  }
  presentAlert(title, msgs) {
    let alert = this.alertCtrl.create({
      title: title,
      // subTitle: msg,
      message: msgs,
      buttons: ['OK']
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
    else if (this.user.FirstName == '') {
      this.presentAlert('Alert!', 'Please enter your First Name');
      this.loader.dismiss();
      return;
    }
    else if (this.user.LastName == '') {
      this.presentAlert('Alert!', 'Please enter your Last Name');
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
    console.log('setting this user data ',this.user);
    this.storage.set('RegisterTeacherUserStep', this.user);
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
  verifyPhone(){
    this.navCtrl.push(Teacherregister1Page);
  }
  loginpage(){
    this.navCtrl.push(LoginPage);
  }
}
