import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Teacherregister2Page } from '../teacherregister2/teacherregister2';
import { LoginPage } from '../login/login';
/**
 * Generated class for the Teacherregister1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacherregister1',
  templateUrl: 'teacherregister1.html',
})
export class Teacherregister1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Schoolregister2Page');
  }
  teacherregister2(){
    this.navCtrl.push(Teacherregister2Page);
  }
  backtologin(){
    this.navCtrl.push(LoginPage);
  }
  skip(){
    this.navCtrl.push(Teacherregister2Page);
  }
}
