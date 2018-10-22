import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Services } from '../../providers/services';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { MyTools } from '../../providers/tools';
@IonicPage()
@Component({
  selector: 'page-listreview',
  templateUrl: 'listreview.html',
})
export class ListreviewPage {
  teacherID:any;
  loader: any;
  reviewlist: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public services: Services,
    public tools: MyTools,) {
    this.teacherID = navParams.get('reviewTeacherID');
    this.getReviews();
  }

  presentAlert(title1,msgs) {
    let alert = this.alertCtrl.create({
      title: title1,
      message: msgs,
      buttons: ['Dismiss']
    });
    alert.present();
  }

    //Show Loader
    showLoader() {
      this.loader = this.tools.getLoader();
      this.loader.present();
    }

  getReviews(){
    this.showLoader();
    let body = new FormData();
    body.append('teacherID',this.teacherID);
    console.log('body : ',body);
    
        this.services.getreview(body).subscribe(
          //Successfully Logged in
          success => {
            this.reviewlist = success.data
            this.loader.dismiss();  
            console.log('addreview success ::::', success);
            
          },
          error => {
            this.loader.dismiss();  
            console.log('error bhai revie list', error);
            // this.presentAlert('Alert!', error.message);
          }
        )




  }

}
