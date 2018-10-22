import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
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
  selector: 'page-publicprofile',
  templateUrl: 'publicprofile.html',
})
export class PublicprofilePage {
  loader: any;
  profileList: any='';
  userDetail: any;
  seeprofileid:any=0;
  LogoUrl = AppSettings.LogoUrl;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public services: Services,
    private storage: MyStorage,
    public tools: MyTools,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private sanitizer: DomSanitizer) {
      this.seeprofileid = navParams.get('id');
      if(this.seeprofileid!=0 && this.seeprofileid!='' && this.seeprofileid!=null){
        this.profileService(this.seeprofileid);        
      }
      else{
        this.storage.get('user').then(
          (val) => {
            if (val != null) {
              console.log('val',val);
              this.userDetail = val;
              this.profileService(this.userDetail.Id);
            }
          }
        )
      }
      
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
          this.presentAlert('Alert!', error.message);
        }
      )
      
  
}
sanitizerfn(img){
  return this.sanitizer.bypassSecurityTrustUrl('data:image/*;charset=utf-8;base64,'+img);
}

}
