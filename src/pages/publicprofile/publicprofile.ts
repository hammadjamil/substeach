import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/takeUntil';
import { ViewController } from 'ionic-angular';
import { Services } from '../../assets/providers/services';
import { ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-publicprofile',
  templateUrl: 'publicprofile.html',
})
export class PublicprofilePage {
  profilelist:any='';
  profileimgurl:any='';
  uid:any='';
  title:any;
  username:any='';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public plt: Platform,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              private view: ViewController,
              public services: Services) 
  {
    this.username=this.navParams.get('username');
      this.myprofile();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilePage');
  }
myprofile(){
    this.services.myprofiledata(this.username).subscribe(
      success => {
          this.profilelist = success.data;
        console.log('hamza data profilelist::', this.profilelist);
      },
      err => {
        console.log('error', err);
      }
    )
}
closeModal() {
  this.view.dismiss();
}
}
