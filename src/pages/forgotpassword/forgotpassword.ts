import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { Services } from '../../providers/services';

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  user: any = {email:''};
  disableButton;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private storage: Storage, 
              private menu: MenuController,
              public services: Services)
  {

  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }
  presentAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      // subTitle: msg,
      message: msg,
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
  loader: any;
  showLoader() {
    this.loader = this.getLoader();
    this.loader.present();
  }
  // loader
  //Login
  loginpage(){
    this.navCtrl.push(LoginPage);
  }
  forgotpswd(){
    this.disableButton = true;
    // this.showLoader();
    //Applying Validations
    if (this.user.email == '') {
      // this.loader.dismiss();
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your email.');
        this.disableButton = false;
      }, 500);
      return;
    }
    //Requesting API 
    else {
      let body = new FormData();
      body.append('Email', this.user.email);
      console.log(body);
      
          this.services.forgotpassword(body).subscribe(
            //Successfully Logged in
            success => {
              console.log(' login success',success);
              setTimeout(() => {
              }, 500);
              setTimeout(() => {
                this.presentAlert('Success!', success.message);
                this.disableButton = false;
                this.navCtrl.push(LoginPage);
              }, 500);
            },
            error => {
              console.log('error bhai', error);
              setTimeout(() => {
                this.presentAlert('Alert!', error.message);
                this.disableButton = false;
              }, 500);
            }
          )
    }
  }
}
