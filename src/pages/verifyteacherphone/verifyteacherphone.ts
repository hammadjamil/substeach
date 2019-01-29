import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Teacherregister4Page } from '../teacherregister4/teacherregister4';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HTTP } from '@ionic-native/http';
@IonicPage()
@Component({
  selector: 'page-verifyteacherphone',
  templateUrl: 'verifyteacherphone.html',
})
export class VerifyteacherphonePage {
  loader: any;
  user: any = 
  { 
    code: '', 
  };
  RegisterSchoolcountrycode:any;
  RegisterSchoolPhoneNumber:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,private http: Http,
    public loadingCtrl: LoadingController,
    private httpi: HTTP,
    private menu: MenuController,
    private alertCtrl: AlertController) {
      this.storage.get('RegisterSchoolPhoneNumber').then(
        (val) => {
          if (val != null) {
            this.RegisterSchoolPhoneNumber = val;
          }
        }
      )
      this.storage.get('RegisterSchoolcountrycode').then(
        (val) => {
          if (val != null) {
            this.RegisterSchoolcountrycode = val;
          }
        }
      )
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPhonePage');
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
  showLoader() {
    this.loader = this.getLoader();
    this.loader.present();
  }
  // loader
  verify(){
    let res = this.otpVerify(this.RegisterSchoolPhoneNumber, this.user.code, this.RegisterSchoolcountrycode);
    console.log('dddaataaa: ',res);
    // if(res==true){
    // }
  }
  otpVerify(phoneNumber, code, countryCode): any {
    this.httpi.get('https://api.authy.com/protected/json/phones/verification/check?api_key=0BRn09UheRZVxSsVS074h6azkngmxwRy'+ '&country_code=' + countryCode + '&phone_number=' + phoneNumber + '&verification_code=' + code, {}, {})
    .then(success => {
      console.log(success.status);
      console.log(JSON.parse(success.data)); // data received by server
      console.log('data : ',success.data);
      // return true;
      this.teacherregister3();
    })
    .catch(error => {
      let errorres=JSON.parse(error.error);
      this.presentAlert('',errorres.message);
      console.log(error);
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
      // return false;
    });
  }
  teacherregister3(){
    this.navCtrl.push(Teacherregister4Page);
  }

}
