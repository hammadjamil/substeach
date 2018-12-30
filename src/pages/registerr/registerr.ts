import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationchoicePage } from '../registrationchoice/registrationchoice';

@IonicPage()
@Component({
  selector: 'page-registerr',
  templateUrl: 'registerr.html',
})
export class RegisterrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterrPage');
  }
  login(){
    this.navCtrl.push(LoginPage)
  }
  register(){
    this.navCtrl.push(RegistrationchoicePage)
  }

}
