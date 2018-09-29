import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Services } from '../../providers/services';

/**
 * Generated class for the SchoolprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schoolprofile',
  templateUrl: 'schoolprofile.html',
})
export class SchoolprofilePage {
  schoolDay : any ={
    'Day' :'',
    TimeSlote :'',
    Standard :'',
    Type : 'Days',
    Description :'',
  };
  Standard : any;
  schoolPeriod : any={
    ToDate :'',
    FromDate :'',
    TimeSlote :'',
    Standard :'',
    Type : 'Period',
    Description :'',
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
    private storage: Storage,
    public services: Services,
    private alertCtrl: AlertController) {
    this.services.getStandards().subscribe(
      //Successfully Logged in
      success => {
        console.log('Success : ',success);
        this.Standard = success.userData;
      },
      error => {
        console.log('error bhai', error);
        setTimeout(() => {
          // if (error.message.length==1){
            this.presentAlert('Alert!', error.message);
            this.loader.dismiss();
          // }
          
        }, 500);
      }
    )
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
      <img src = "../../assets/imgs/loader2.gif">
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolprofilePage');
  }

  save(){
    console.log('schoolDay : ',this.schoolDay);
    console.log('schoolPeriod : ',this.schoolPeriod);
    
  }

}
