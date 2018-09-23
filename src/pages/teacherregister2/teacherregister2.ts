import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Teacherregister3Page } from '../teacherregister3/teacherregister3';

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
  back(){
    this.navCtrl.pop();
  }
  skip(){
    this.navCtrl.push(Teacherregister3Page);
  }
}
