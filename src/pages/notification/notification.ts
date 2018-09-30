import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { Services } from '../../providers/services';
import { ChatPage } from '../chat/chat';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  userID : any;
  userdata:any='';
  notificationList : any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public services: Services,
    private alertCtrl: AlertController) {
    this.storage.get('user').then((val) => {
      console.log('val :', val );
      this.userdata=val;
      this.userID = val.Id;
      this.getData();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  getData(){
        let body = new FormData();
        body.append('userId',  this.userID);
        this.services.ShowNotification(body).subscribe(
          //Successfully Logged in
          success => {
            console.log('Success : ',success);
            this.notificationList = success.data;
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

  presentAlert(title, msgs) {
    let alert = this.alertCtrl.create({
      title: title,
      // subTitle: msg,
      message: msgs,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  // loader
  getLoader() {
    console.log('showing loader now');
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      showBackdrop: false,
      content: `
      <div class="custom-spinner-container" style="width:30px">
      <img src = "../../assets/imgs/loader2.gif">
      </div>`
    });
    return loader;
  }
  loader: any;
  showLoader() {
    this.loader = this.getLoader();
    this.loader.present();
  }
  // loader
  chatpg(){
    this.navCtrl.push(ChatPage);
  }
}
