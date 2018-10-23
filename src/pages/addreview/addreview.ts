import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Services } from '../../providers/services';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addreview',
  templateUrl: 'addreview.html',
})
export class AddreviewPage {
  review = {
    'rating' :'',
    'text' : ''
  }
  teacherID : any;
  schoolID : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public services: Services,) {

    this.teacherID = navParams.get('reviewTeacherID');
    this.schoolID = navParams.get('reviewSchoolID');
    console.log('teacggerID = ',this.teacherID);
    console.log('schoolID = ',this.schoolID);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddreviewPage');
  }

  presentAlert(title1,msgs) {
    let alert = this.alertCtrl.create({
      title: title1,
      message: msgs,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  saveReview(){
    if (this.review.rating == '') {
      // this.loader.dismiss();
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please rate teacher');
      }, 500);
      return;
    }
    else if (this.review.text == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter review');
      }, 500);
      return;
    }

    let body = new FormData();
    body.append('rating',this.review.rating);
    body.append('text',this.review.text);
    body.append('teacherID',this.teacherID);
    body.append('schoolID',this.schoolID);
    console.log('body : ',body);
    
        this.services.addreview(body).subscribe(
          //Successfully Logged in
          success => {
            console.log('addreview success ::::', success);
            this.presentAlert('Alert!', 'Review successfully added.');
            // this.navCtrl.push(HomePage,{})
            this.navCtrl.pop();
          },
          error => {
            console.log('error bhai favlist', error);
            // this.presentAlert('Alert!', error.message);
          }
        )




  }

}
