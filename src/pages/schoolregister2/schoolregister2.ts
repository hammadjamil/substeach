import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Schoolregister3Page } from '../schoolregister3/schoolregister3';
import { LoginPage } from '../login/login';
/**
 * Generated class for the Schoolregister2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schoolregister2',
  templateUrl: 'schoolregister2.html',
})
export class Schoolregister2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Schoolregister2Page');
  }
  schoolregister3(){
    this.navCtrl.push(Schoolregister3Page);
  }
  backtologin(){
    this.navCtrl.push(LoginPage);
  }
  skip(){
    this.navCtrl.push(Schoolregister3Page);
  }
}
