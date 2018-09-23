import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { SchoolregisterPage } from '../schoolregister/schoolregister';
// import { Teacherregister1Page } from '../teacherregister1/teacherregister1';
import { LoginPage } from '../login/login';
import { PhonenumberschoolPage } from '../phonenumberschool/phonenumberschool';
import { PhonenumberteacherPage } from '../phonenumberteacher/phonenumberteacher';

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
    this.navCtrl.push(PhonenumberteacherPage);
  }
  schoolregister1(){
    this.navCtrl.push(PhonenumberschoolPage);
  }
  backtologin(){
    this.navCtrl.push(LoginPage);    
  }
}
