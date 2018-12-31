import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterrPage } from '../registerr/registerr';
import { FaqPage } from '../faq/faq';
import { RechtlichesPage } from '../rechtliches/rechtliches';


@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  setting=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.setting=this.navParams.get('setting');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }
  register(){
    this.navCtrl.push(RegisterrPage)
  }
  faq(){
    this.navCtrl.push(FaqPage)
  }
  rech(){
    this.navCtrl.push(RechtlichesPage)
  }
}
