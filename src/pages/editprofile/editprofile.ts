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
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {
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

updateSchool(){ 
  
  this.showLoader();
  let body = new FormData();
      body.append('SchoolName', this.profileList.SchoolName);
      body.append('Details', this.profileList.Details);
      body.append('VisitingAddress1', this.profileList.VisitingAddress1);
      body.append('VisitingAddress2', this.profileList.VisitingAddress2);
      body.append('VisitingCity', this.profileList.VisitingCity);
      body.append('VisitingPostalCode', this.profileList.VisitingPostalCode);
      body.append('GovtIssuedID', this.profileList.GovtIssuedID);
      body.append('BillingAddress1', this.profileList.BillingAddress1);
      body.append('BillingAddress2', this.profileList.BillingAddress2);
      body.append('BillingCity', this.profileList.BillingCity);
      body.append('BillingPostalCode', this.profileList.BillingPostalCode);
      body.append('BillingCountry', this.profileList.BillingCountry);
      body.append('userId', this.profileList.userId);
      body.append('ClientID', this.profileList.ClientID);
      
      this.services.updateSchool(body).subscribe(
        //Successfully Logged in
        success => {
          setTimeout(() => {
            this.presentAlert('Success!', 'You are successfully updated.');
            this.loader.dismiss();
          }, 2000);
        },
        error => {
          console.log('error bhai', error);
                  setTimeout(() => {
                      this.presentAlert('Alert!', error.message);
                      this.loader.dismiss();
                    
                  }, 500);
        }
      )
}

updateTeacher(){
  this.showLoader();
  let body = new FormData();
  body.append('FirstName', this.profileList.FirstName);
  body.append('LastName', this.profileList.LastName);
  body.append('userId', this.profileList.userId);
      body.append('ClientID', this.profileList.ClientID);
      this.services.updateTeacher(body).subscribe(
        //Successfully Logged in
        success => {
          setTimeout(() => {
            this.presentAlert('Success!', 'You are successfully updated.');
            this.loader.dismiss();
          }, 2000);
        },
        error => {
          console.log('error bhai', error);
                  setTimeout(() => {
                      this.presentAlert('Alert!', error.message);
                      this.loader.dismiss();
                    
                  }, 500);
        }
      )
}

}
