import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { SchoolregisterPage } from '../schoolregister/schoolregister';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
     public loadingCtrl: LoadingController,
     private menu: MenuController,
     private alertCtrl: AlertController) {
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
    this.showLoader();
    if(this.user.code == '12345'){
      this.loader.dismiss();
      this.schoolregister3();
    }else{
      this.presentAlert('Alert!', 'Code does not match');
      this.loader.dismiss();
    }
  }
  schoolregister3(){
    this.navCtrl.push(SchoolregisterPage);
  }
  back(){
    this.navCtrl.pop();
  }
}




