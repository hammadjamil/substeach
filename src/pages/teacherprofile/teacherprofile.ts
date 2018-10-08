import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Services } from '../../providers/services';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-teacherprofile',
  templateUrl: 'teacherprofile.html',
})
export class TeacherprofilePage {
  schoolDay : any ={
    Day :'',
    TimeSlote :'',
    Standard :'',
  };
  Standard:any;
  userID:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage,
    public services: Services,
    private alertCtrl: AlertController,
    public events: Events,
    public loadingCtrl: LoadingController) {
      this.events.publish('user:login');
      this.storage.get('user').then((val) => {
        console.log('val :', val );
        this.userID = val.Id;
      });
    this.services.getStandards().subscribe(
      //Successfully Logged in
      success => {
        console.log('Success : ',success);
        this.Standard = success.userData;
        console.log('Standard : ',this.Standard);
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherprofilePage');
  }
  save(){
    console.log('schoolDay : ',this.schoolDay);
    let body = new FormData();
    body.append('Day', this.schoolDay.Day);
    body.append('TimeSlote', this.schoolDay.TimeSlote);
    body.append('Standard', this.schoolDay.Standard);
    body.append('userID', this.userID);
    this.services.saveTeachersettings(body).subscribe(
      //Successfully Logged in
      success => {
        console.log('Success : ',success);
        this.presentAlert('Alert!', 'Your request successfull completed.');
        console.log('Standard : ',this.Standard);
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
}
