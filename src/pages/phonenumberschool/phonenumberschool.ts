import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController} from 'ionic-angular';
import { VerifyphonePage } from '../verifyphone/verifyphone';
import { Services } from '../../providers/services';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


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
    private http: Http) {
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
    
    // var x = Math.floor((Math.random() * 10000) + 1);
    // this.sms.send(this.user.phonenumber, 'Your verification code for substeach is :'+x);
    console.log('setting this user data ',this.user);
    this.storage.set('RegisterSchoolPhoneNumber', this.user.phonenumber);
    this.storage.set('RegisterSchoolcountrycode', this.user.countrycode);

    let res = this.sendVerificationCode(this.user.phonenumber, this.user.countrycode);
    console.log('les : ',res);
    
    this.loader.dismiss();
              this.next();

    
  }

  sendVerificationCode(phoneNumber, countryCode): any {
 
    return new Promise((resolve, reject)=>{


        let body = new FormData();
        body.append('api_key', '0BRn09UheRZVxSsVS074h6azkngmxwRy');
        body.append('country_code',countryCode);
        body.append('phone_number', phoneNumber);
        body.append('via', 'sms');

        this.http.post('https://api.authy.com/protected/json/phones/verification/start', body)
            .map(res => res.json())
            .subscribe(data => {
              console.log('data : ',data);
              // this.loader.dismiss();
              // this.next();
                resolve(data);
            }, function (error) {
                reject(error);
            });
    });
}

}
