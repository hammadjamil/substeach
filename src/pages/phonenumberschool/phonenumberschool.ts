import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VerifyphonePage } from '../verifyphone/verifyphone';

@IonicPage()
@Component({
  selector: 'page-phonenumberschool',
  templateUrl: 'phonenumberschool.html',
})
export class PhonenumberschoolPage {
  public user={phone:''};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
}
