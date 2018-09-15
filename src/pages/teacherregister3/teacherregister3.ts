import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrationchoicePage } from '../registrationchoice/registrationchoice';
import { LoginPage } from '../login/login';
/**
 * Generated class for the Teacherregister3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacherregister3',
  templateUrl: 'teacherregister3.html',
})
export class Teacherregister3Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Teacherregister3Page');
  }
  registerchoice(){
    this.navCtrl.push(RegistrationchoicePage);
  }
  backtologin(){
    this.navCtrl.push(LoginPage);
  }
  skip(){
    this.navCtrl.push(RegistrationchoicePage);
  }
}
