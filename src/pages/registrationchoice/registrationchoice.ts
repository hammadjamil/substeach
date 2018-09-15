import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Schoolregister1Page } from '../schoolregister1/schoolregister1';
import { Teacherregister1Page } from '../teacherregister1/teacherregister1';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegistrationchoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrationchoice',
  templateUrl: 'registrationchoice.html',
})
export class RegistrationchoicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationchoicePage');
  }
  teacherregister1(){
    this.navCtrl.push(Teacherregister1Page);
  }
  schoolregister1(){
    this.navCtrl.push(Schoolregister1Page);
  }
  backtologin(){
    this.navCtrl.push(LoginPage);    
  }
}
