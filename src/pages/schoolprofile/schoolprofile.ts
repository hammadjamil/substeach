import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { NotificationPage } from '../notification/notification';
import { EditprofilePage } from '../editprofile/editprofile';
import { Services } from '../../providers/services';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-schoolprofile',
  templateUrl: 'schoolprofile.html',
})
export class SchoolprofilePage {
  schooltabs: string = "days";
  userData:any='';
  schoolDay : any ={
    Day :'',
    TimeSlote :'',
    Standard :'',
    Type : 'Days',
    Description :'',
  };
  Standard : any;
  schoolPeriod : any={
    ToDate :'',
    FromDate :'',
    TimeSlote :'',
    Standard :'',
    Type : 'Period',
    Description :'',
  };
  seldays:any={Monday:'',Tuesday:'',Wednesday:'',Thursday:'',Friday:'',Saturday:'',Sunday:''};
  seltimeslots:any={slot1:'',slot2:'',slot3:'',slot4:'',slot5:'',slot6:'',slot7:''};
  selstandrads:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public events: Events,
    public services: Services,
    private alertCtrl: AlertController) {
      this.storage.get('user').then((val) => {
          this.userData=val;
          console.log('userdata',this.userData);
      });
      //this.events.publish('user:login');
    this.services.getStandards().subscribe(
      //Successfully Logged in
      success => {
        console.log('Success : ',success);
        this.Standard = success.userData;
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
    console.log('ionViewDidLoad SchoolprofilePage');
  }

  matchByDay(){
    if (this.schoolDay.Day == '') {
      // this.loader.dismiss();
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter Day');
      }, 1000);
      return;
    }
    else if (this.schoolDay.TimeSlote == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Time Slote');
      }, 1000);
      return;
    }
    else if (this.schoolDay.Standard == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Standard');
      }, 1000);
      return;
    }
    this.storage.set('searchCriteria',this.schoolDay);
    this.navCtrl.push(HomePage);
    // console.log('schoolDay : ',this.schoolDay);
    // console.log('schoolPeriod : ',this.schoolPeriod);
    // let body = new FormData();
    // body.append('Day', this.schoolDay.Day);
    // body.append('TimeSlote', this.schoolDay.TimeSlote);
    // body.append('Standard', this.schoolDay.Standard);
    // this.services.getMatchesByDay(body).subscribe(
    //   //Successfully Logged in
    //   success => {
    //     console.log('Success : ',success);
    //     this.Standard = success.userData;
    //   },
    //   error => {
    //     console.log('error bhai', error);
    //     setTimeout(() => {
    //       // if (error.message.length==1){
    //         this.presentAlert('Alert!', error.message);
    //         this.loader.dismiss();
    //       // }
          
    //     }, 500);
    //   }
    // )
    
  }


  matchByPeriod(){
    if (this.schoolPeriod.ToDate == '') {
      // this.loader.dismiss();
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter To Date');
      }, 1000);
      return;
    }
    else if (this.schoolPeriod.FromDate == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your From Date');
      }, 1000);
      return;
    }
    else if (this.schoolPeriod.Standard == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Standard');
      }, 1000);
      return;
    }
    console.log('schoolDay : ',this.schoolDay);
    console.log('schoolPeriod : ',this.schoolPeriod);
    this.storage.set('searchCriteria',this.schoolPeriod);
    this.navCtrl.push(HomePage);
  //   let body = new FormData();
  //   body.append('ToDate', this.schoolPeriod.ToDate);
  //   body.append('FromDate', this.schoolPeriod.FromDate);
  //   body.append('TimeSlote', this.schoolPeriod.TimeSlote);
  //   body.append('Standard', this.schoolPeriod.Standard);
  //   this.services.getMatchesByPeriod(body).subscribe(
  //     //Successfully Logged in
  //     success => {
  //       console.log('Success : ',success);
  //       this.Standard = success.userData;
  //     },
  //     error => {
  //       console.log('error bhai', error);
  //       setTimeout(() => {
  //         // if (error.message.length==1){
  //           this.presentAlert('Alert!', error.message);
  //           this.loader.dismiss();
  //         // }
          
  //       }, 500);
  //     }
  //   )
    
   }
shownoti(){
  this.navCtrl.push(NotificationPage);
}
editprofilepage(){
  this.navCtrl.push(EditprofilePage);
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
