import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController} from 'ionic-angular';
import { VerifyphonePage } from '../verifyphone/verifyphone';
import { Services } from '../../providers/services';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Twilio } from 'twilio';
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
  };
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public services: Services,
    public twilio: Twilio,
    private alertCtrl: AlertController,
    private menu: MenuController) {
  }
  twiliosms(){
    const accountSid = 'PN61e78a49210cb0c4e4bac82599ae434d';
    const authToken = '787c88d50156635ed092061a1338950f';
    const client = require('twilio')(accountSid, authToken);
    client.messages
    .create({
      body: 'test asas',
      from: '+41798074029',
      to: '+923045959785'
    })
    .then(message => console.log(message.sid))
    .done();
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
      this.presentAlert('Alert!', 'Please enter your phone number');
      this.loader.dismiss();
      return;
    }
    
    // var x = Math.floor((Math.random() * 10000) + 1);
    // this.sms.send(this.user.phonenumber, 'Your verification code for substeach is :'+x);
    console.log('setting this user data ',this.user);
    this.storage.set('RegisterSchoolPhoneNumber', this.user.phonenumber);
    this.loader.dismiss();
    this.next();
  }
}
