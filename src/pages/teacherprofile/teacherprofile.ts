import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NotificationPage } from '../notification/notification';
import { EditprofilePage } from '../editprofile/editprofile';
import { FavouritesPage } from '../favourites/favourites';
import { Services } from '../../providers/services';
import { Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-teacherprofile',
  templateUrl: 'teacherprofile.html',
})
export class TeacherprofilePage {
  schooltabs: string = "days";
  schoolDay : any ={
    Day :'',
    TimeSlote :'',
    Standard :'',
  };
  Standard:any;
  userID:any;
  Logo:any;
  userData:any;
  noticountdata:any='';
  seldays:any={Monday:'',Tuesday:'',Wednesday:'',Thursday:'',Friday:'',Saturday:'',Sunday:''};
  seltimeslots:any={slot1:'',slot2:'',slot3:'',slot4:'',slot5:'',slot6:'',slot7:''};
  selstandrads:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage,
    public services: Services,
    private alertCtrl: AlertController,
    public events: Events,
    private sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController) {
      this.events.publish('user:login');
      this.storage.get('user').then((val) => {
        this.userData = val;
        // console.log('val :', val );
        this.userID = val.Id;
        if(this.userData.Usertype == "School"){
          this.Logo = this.sanitizer.bypassSecurityTrustUrl('data:image/*;charset=utf-8;base64,'+this.userData.LogoPath);
        }else{
          this.Logo = this.sanitizer.bypassSecurityTrustUrl('data:image/*;charset=utf-8;base64,'+this.userData.ImagePath);
        }
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
  getnotificationcount(){
    console.log(this.userID.Id);
   let body = new FormData();
   body.append('userId', this.userID.Id);
   this.services.notificationcount(body).subscribe(
     //Successfully Logged in
     success => {
       setTimeout(() => {
         console.log(success);
         this.noticountdata=success;
       }, 500);
     },
     error => {
       console.log('error bhai', error);
     }
   )
  }
  shownoti(){
    this.navCtrl.push(NotificationPage);
  }
  editprofilepage(){
    this.navCtrl.push(EditprofilePage);
  }
  showfav(){
    this.navCtrl.push(FavouritesPage);
  }
  toggledays(value){
    if (value == 'Monday'){
      if(this.seldays.Monday==1){
        this.seldays.Monday='';
      }
      else{
        this.seldays.Monday=1;
      }
    }
    if (value == 'Tuesday'){
      if(this.seldays.Tuesday==1){
        this.seldays.Tuesday='';
      }
      else{
        this.seldays.Tuesday=1;
      }
    }
    if (value == 'Wednesday'){
      if(this.seldays.Wednesday==1){
        this.seldays.Wednesday='';
      }
      else{
        this.seldays.Wednesday=1;
      }
    }
    if (value == 'Thursday'){
      if(this.seldays.Thursday==1){
        this.seldays.Thursday='';
      }
      else{
        this.seldays.Thursday=1;
      }
    }
    if (value == 'Friday'){
      if(this.seldays.Friday==1){
        this.seldays.Friday='';
      }
      else{
        this.seldays.Friday=1;
      }
    }
    if (value == 'Saturday'){
      if(this.seldays.Saturday==1){
        this.seldays.Saturday='';
      }
      else{
        this.seldays.Saturday=1;
      }
    }
    if (value == 'Sunday'){
      if(this.seldays.Sunday==1){
        this.seldays.Sunday='';
      }
      else{
        this.seldays.Sunday=1;
      }
    }
  }
  toggletimeslot(value){
    if (value == '9:00 -10:00'){
      if(this.seltimeslots.slot1==1){
        this.seltimeslots.slot1='';
      }
      else{
        this.seltimeslots.slot1=1;
      }
    }
    if (value == '10:00 -11:00'){
      if(this.seltimeslots.slot2==1){
        this.seltimeslots.slot2='';
      }
      else{
        this.seltimeslots.slot2=1;
      }
    }
    if (value == '11:00 -12:00'){
      if(this.seltimeslots.slot3==1){
        this.seltimeslots.slot3='';
      }
      else{
        this.seltimeslots.slot3=1;
      }
    }
    if (value == '12:00 -01:00'){
      if(this.seltimeslots.slot4==1){
        this.seltimeslots.slot4='';
      }
      else{
        this.seltimeslots.slot4=1;
      }
    }
    if (value == '01:00 -02:00'){
      if(this.seltimeslots.slot5==1){
        this.seltimeslots.slot5='';
      }
      else{
        this.seltimeslots.slot5=1;
      }
    }
    if (value == '02:00 -03:00'){
      if(this.seltimeslots.slot6==1){
        this.seltimeslots.slot6='';
      }
      else{
        this.seltimeslots.slot6=1;
      }
    }
    if (value == '03:00 -04:00'){
      if(this.seltimeslots.slot7==1){
        this.seltimeslots.slot7='';
      }
      else{
        this.seltimeslots.slot7=1;
      }
    }
  }
  togglestandrads(value){
    if (value == 'Monday'){
      if(this.seldays.Monday==1){
        this.seldays.Monday='';
      }
      else{
        this.seldays.Monday=1;
      }
    }
    if (value == 'Tuesday'){
      if(this.seldays.Tuesday==1){
        this.seldays.Tuesday='';
      }
      else{
        this.seldays.Tuesday=1;
      }
    }
    if (value == 'Wednesday'){
      if(this.seldays.Wednesday==1){
        this.seldays.Wednesday='';
      }
      else{
        this.seldays.Wednesday=1;
      }
    }
    if (value == 'Thursday'){
      if(this.seldays.Thursday==1){
        this.seldays.Thursday='';
      }
      else{
        this.seldays.Thursday=1;
      }
    }
    if (value == 'Friday'){
      if(this.seldays.Friday==1){
        this.seldays.Friday='';
      }
      else{
        this.seldays.Friday=1;
      }
    }
    if (value == 'Saturday'){
      if(this.seldays.Saturday==1){
        this.seldays.Saturday='';
      }
      else{
        this.seldays.Saturday=1;
      }
    }
    if (value == 'Sunday'){
      if(this.seldays.Sunday==1){
        this.seldays.Sunday='';
      }
      else{
        this.seldays.Sunday=1;
      }
    }
  }
}
