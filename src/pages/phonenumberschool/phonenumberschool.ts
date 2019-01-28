import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController} from 'ionic-angular';
import { VerifyphonePage } from '../verifyphone/verifyphone';
import { Services } from '../../providers/services';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
// import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HTTP } from '@ionic-native/http';

@IonicPage()
@Component({
  selector: 'page-phonenumberschool',
  templateUrl: 'phonenumberschool.html',
  providers :[] 
})
export class PhonenumberschoolPage {
  user: any = 
  {   
    phonenumber: '', 
    countrycode:''
  };
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public services: Services,
    private alertCtrl: AlertController,
    private menu: MenuController,
    private httpi: HTTP,
    ) {
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PhonenumberschoolPage');
  }
  back(){
    this.navCtrl.pop();
  }
  next(){
    this.navCtrl.push(VerifyphonePage);
  }

  presentAlert(title, msgs) {
    let alert = this.alertCtrl.create({
      title: title,
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
    if (this.user.phonenumber == '') {
      this.presentAlert('Alert!', 'Please enter your phone number.');
      this.loader.dismiss();
      return;
    }
    if (this.user.countrycode == '') {
      this.presentAlert('Alert!', 'Please enter your country code.');
      this.loader.dismiss();
      return;
    }
    console.log('setting this user data ',this.user);
    this.storage.set('RegisterSchoolPhoneNumber', this.user.phonenumber);
    this.storage.set('RegisterSchoolcountrycode', this.user.countrycode);
    let res = this.sendVerificationCode(this.user.phonenumber, this.user.countrycode);
    console.log('les : ',res);
    this.loader.dismiss();
    if(res==true){
      this.next();
    }
  }
  sendVerificationCode(phoneNumber, countryCode): any {
    this.httpi.post('https://api.authy.com/protected/json/phones/verification/start', {api_key:'0BRn09UheRZVxSsVS074h6azkngmxwRy',country_code:countryCode,phone_number:phoneNumber,via:'sms'}, {})
    .then(success => {
      console.log(success.status);
      console.log(JSON.parse(success.data)); // data received by server
      console.log('data : ',success.data);
      return true;
    })
    .catch(error => {
      this.presentAlert('',error.error);
      console.log(error);
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
      return false;
    });
  }
}
