import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Teacherregister4Page } from '../teacherregister4/teacherregister4';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
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
      this.storage.set('RegisterTeacherPhone', this.user);
      this.teacherregister3();
    }else{
      this.presentAlert('Alert!', 'Code does not match');
      this.loader.dismiss();
    }
  }
  teacherregister3(){
    this.navCtrl.push(Teacherregister4Page);
  }

}
