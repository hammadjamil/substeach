import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LogoutPage } from '../logout/logout';
import { MyTools } from '../../providers/tools';
import { Services } from '../../providers/services';
import { PaymentPage } from '../payment/payment';
import { MyStorage } from '../../app/localstorage';
import { BlocklistPage } from '../blocklist/blocklist';
import { BookinglistPage } from '../bookinglist/bookinglist';
import { HelpPage } from '../help/help';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  loader: any;
  pages: Array<{title: string, component: any}>;
  exitApp = 0;
  userData : any='';
  homepage:any;
  Logo:any = '';
  userDetail:any = '';
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, private alertCtrl: AlertController,
    private storage: MyStorage,private services: Services,public tools: MyTools,private auth: Auth,public navParams: NavParams) {
  
    this.storage.get('user').then(
      (val) => {
        if (val != null) {
          this.userDetail = val;
        }
      }
    )}

 
  logout() {
    this.auth.logout();
    this.showLoader();
    this.logoutNow(this.loader);      
  }
  logoutNow(loader) {
    setTimeout(() => {
      loader.dismiss();
      this.auth.logout();
      this.navCtrl.setRoot(LoginPage);
    }, 500);
  }
   //Loader 
   showLoader() {
    this.loader = this.tools.getLoader();
    this.loader.present();
  }
  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
  pay(){
    this.navCtrl.push(PaymentPage,{})
  }
  blocklist(){
    this.navCtrl.push(BlocklistPage);
  }
  bookinglist(){
    this.navCtrl.push(BookinglistPage);
  }


  presentAlert(title, msgs) {
    let alert = this.alertCtrl.create({
      title: title,
      // subTitle: msg,
      message: msgs,
      buttons: ['OK']
    });
    alert.present();
  }


  Unsubscribe(){
    
    console.log('this.userDetail :',this.userDetail);
    this.showLoader();
      let body = new FormData();
      body.append('SchoolID', this.userDetail.SchoolID);
      this.services.Unsubscribe(body).subscribe(
        //Successfully Logged in
        success => {
          
          setTimeout(() => {
            this.presentAlert('Success!', 'You are successfully Unsubscribed.');
            this.userDetail.Ispaid='no';
            this.storage.set('user', this.userDetail);
              this.loader.dismiss();
          }, 500);
        },
        error => {
          console.log('error bhai', error);
          setTimeout(() => {
            // if (error.message.length==1){
              this.presentAlert('Alert!', error.message);
              this.loader.dismiss();
            // }
            
          }, 500);
        }
      )
  }

  help(){
    this.navCtrl.push(HelpPage,{setting:1});
  }
}
