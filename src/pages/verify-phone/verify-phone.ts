import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Schoolregister1Page } from '../schoolregister1/schoolregister1';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-verify-phone',
  templateUrl: 'verify-phone.html',
})
export class VerifyPhonePage {
  loader: any;
  user: any = 
  { 
    code: '', 
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
     public loadingCtrl: LoadingController,
     private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPhonePage');
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
      <img src = "./assets/imgs/loader.gif">
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
    this.showLoader();
    if(this.user.code == '12345'){
      this.loader.dismiss();
      this.schoolregister2();
    }else{
      this.presentAlert('Alert!', 'Code does not match');
      this.loader.dismiss();
    }
  }

  schoolregister2(){
    this.navCtrl.push(Schoolregister1Page);
  }

}
