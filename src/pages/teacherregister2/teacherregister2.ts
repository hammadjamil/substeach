import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Schoolregister3Page } from '../schoolregister3/schoolregister3';
import { Teacherregister3Page } from '../teacherregister3/teacherregister3';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-teacherregister2',
  templateUrl: 'teacherregister2.html',
})
export class Teacherregister2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Schoolregister2Page');
  }
  teacherregister3(){
    this.navCtrl.push(Teacherregister3Page);
  }
  backtologin(){
    this.navCtrl.push(LoginPage);
  }
  skip(){
    this.navCtrl.push(Teacherregister3Page);
  }
}
