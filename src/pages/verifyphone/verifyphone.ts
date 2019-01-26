import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { SchoolregisterPage } from '../schoolregister/schoolregister';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-verifyphone',
  templateUrl: 'verifyphone.html',
})
export class VerifyphonePage {
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
    private storage: Storage,
     public loadingCtrl: LoadingController,
     private menu: MenuController,private http: Http,
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
      // subTitle: msg,
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
    // this.showLoader();
    let res = this.otpVerify(this.RegisterSchoolPhoneNumber, this.user.code, this.RegisterSchoolcountrycode);
    console.log('dddaataaa: ',res);
    // if(this.user.code == '12345'){
      
    //   this.loader.dismiss();
    //   this.schoolregister3();
    // }else{
    //   this.presentAlert('Alert!', 'Code does not match');
    //   this.loader.dismiss();
    // }
  }


  otpVerify(phoneNumber, code, countryCode): any {
 
    return new Promise((resolve, reject) => {
        this.http.get('https://api.authy.com/protected/json/phones/verification/check?api_key=0BRn09UheRZVxSsVS074h6azkngmxwRy'
            + '&country_code=' + countryCode + '&phone_number=' + phoneNumber + '&verification_code=' + code)
            .map(res => res.json())
            .subscribe(data => {
              console.log('dddaataaa: ',data);
              
                resolve(data);
            }, function (error) {
                reject(error);
            });
    });
}



  schoolregister3(){
    this.navCtrl.push(SchoolregisterPage);
  }
  back(){
    this.navCtrl.pop();
  }
}




