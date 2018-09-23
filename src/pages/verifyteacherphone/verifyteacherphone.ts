import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Teacherregister3Page } from '../teacherregister3/teacherregister3';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the VerifyteacherphonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
      this.teacherregister3();
    }else{
      this.presentAlert('Alert!', 'Code does not match');
      this.loader.dismiss();
    }
  }

  teacherregister3(){
    this.navCtrl.push(Teacherregister3Page);
  }

}
