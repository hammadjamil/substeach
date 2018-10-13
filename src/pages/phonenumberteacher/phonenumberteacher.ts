import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { VerifyteacherphonePage } from '../verifyteacherphone/verifyteacherphone';
import { SMS } from '@ionic-native/sms';
import { Services } from '../../providers/services';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-phonenumberteacher',
  templateUrl: 'phonenumberteacher.html',
  providers :[SMS] 
})
export class PhonenumberteacherPage {
  user: any = 
  {   
    phonenumber: '', 
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public services: Services,
    private alertCtrl: AlertController,
    private menu: MenuController,
    private sms: SMS) {
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
    this.navCtrl.push(VerifyteacherphonePage);
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
      this.presentAlert('Alert!', 'Please enter your phone number');
      this.loader.dismiss();
      return;
    }
    // var x = Math.floor((Math.random() * 10000) + 1);
    // this.sms.send(this.user.phonenumber, 'Your verification code for substeach is :'+x);
    
    console.log('setting this user data ',this.user);
    this.storage.set('RegisterTeacherPhoneNumber', this.user.phonenumber);
    this.loader.dismiss();
    this.next();
  }
}
