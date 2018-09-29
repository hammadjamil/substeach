import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController ,Events} from 'ionic-angular';
import { Services } from '../../providers/services';
import { MyStorage } from '../../app/localstorage';
import { Auth } from '../../providers/auth';
import { MyTools } from '../../providers/tools';
import { LoadingController, Platform } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';

@IonicPage()
@Component({
  selector: 'page-publicprofile',
  templateUrl: 'publicprofile.html',
})
export class PublicprofilePage {
  loader: any;
  profileList: any='';
  userDetail: any;
  LogoUrl = AppSettings.LogoUrl;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public services: Services,
    private storage: MyStorage,
    public tools: MyTools,
    private alertCtrl: AlertController) {
      this.storage.get('user').then(
        (val) => {
          if (val != null) {
            console.log('val',val);
            this.userDetail = val;
            this.profileService(this.userDetail.Id);
          }
        }
      )
      // this.profileService();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicprofilePage');
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
  
//Login
profileService(id) {
  this.showLoader();
      this.services.getprofile(id).subscribe(
        //Successfully Logged in
        success => {
          // console.log('profile data', success);
          this.profileList = success.userData;
          console.log('profile data',  this.profileList);
            this.loader.dismiss();

        },
        error => {
          this.loader.dismiss();
          console.log('error bhai', error);
          this.presentAlert('Alert!', error.data);
        }
      )
      
  
}

addToFav(dID){
  this.showLoader();
  //Applying Validations
  let body = new FormData();
  body.append('userId', this.userDetail.Id);
  body.append('DeputyPersonId', dID);
      this.services.addToFav(body).subscribe(
        //Successfully Logged in
        success => {
          console.log('success bhai', success);
            this.loader.dismiss();
            this.presentAlert('Alert!', 'Teacher added to your favourite list');

        },
        error => {
          this.loader.dismiss();
          console.log('error bhai', error);
          this.presentAlert('Alert!', error.message);
        }
      )
}
}
