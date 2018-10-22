import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { LogoutPage } from '../logout/logout';
import { MyTools } from '../../providers/tools';
import { Services } from '../../providers/services';
import { PaymentPage } from '../payment/payment';
import { MyStorage } from '../../app/localstorage';
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
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,
    private storage: MyStorage,private services: Services,public tools: MyTools,private auth: Auth,public navParams: NavParams) {
  
    this.storage.get('user').then(
      (val) => {
        if (val != null) {
          this.userDetail = val;
        }
      }
    )}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  logout() {
    this.auth.logout();
    console.log('showing loader now');
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
}
