import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController ,Events} from 'ionic-angular';
import { Services } from '../../providers/services';
import { MyStorage } from '../../app/localstorage';
import { Auth } from '../../providers/auth';
import { MyTools } from '../../providers/tools';
import { LoadingController, Platform } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  loader: any;
  favList: any='';
  userDetail: any;
  LogoUrl = AppSettings.LogoUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
    public services: Services, private storage: MyStorage,
    public tools: MyTools,
    private alertCtrl: AlertController,
    private sanitizer: DomSanitizer) {
      this.storage.get('favlist').then(
        (val) => {
          if (val != null) {
            console.log('favlist',val);
            this.favList=val.data;
            // this.userDetail = val;
            // this.getFav();
          }
        }
      )
  }

  sanitizerfn(img){
    return this.sanitizer.bypassSecurityTrustUrl('data:image/*;charset=utf-8;base64,'+img);
  }
  //Login
// getFav() {
//   this.showLoader();
//   let body = new FormData();
//   body.append('UserID',this.userDetail.Id);
//       this.services.getFav(body).subscribe(
//         //Successfully Logged in
//         success => {
//           console.log('success bhai', success);
//           this.favList = success.data;
//             this.loader.dismiss();
//         },
//         error => {
//           this.loader.dismiss();
//           console.log('error bhai', error);
//           // this.presentAlert('Alert!', error.message);
//         }
//       )
// }
presentAlert(title1,msgs) {
  let alert = this.alertCtrl.create({
    title: title1,
    message: msgs,
    buttons: ['OK']
  });
  alert.present();
}
//Show Loader
showLoader() {
  this.loader = this.tools.getLoader();
  this.loader.present();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritesPage');
  }

}
