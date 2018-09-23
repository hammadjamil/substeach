import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VerifyteacherphonePage } from '../verifyteacherphone/verifyteacherphone';

@IonicPage()
@Component({
  selector: 'page-phonenumberteacher',
  templateUrl: 'phonenumberteacher.html',
})
export class PhonenumberteacherPage {
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
    this.navCtrl.push(VerifyteacherphonePage);
  }
}
