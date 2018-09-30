import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, 
    private menu: MenuController,
    public navParams: NavParams
    ) {
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
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
