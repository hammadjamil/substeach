import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TermsPage } from '../terms/terms';

/**
 * Generated class for the RechtlichesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rechtliches',
  templateUrl: 'rechtliches.html',
})
export class RechtlichesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechtlichesPage');
  }
  terms(){
    this.navCtrl.push(TermsPage);
  }

}
