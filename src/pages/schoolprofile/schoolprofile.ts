import { Component } from '@angular/core';
import { mobiscroll, MbscSelectOptions } from '@mobiscroll/angular';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationPage } from '../notification/notification';
import { EditprofilePage } from '../editprofile/editprofile';
import { FavouritesPage } from '../favourites/favourites';
import { Services } from '../../providers/services';
import { Events } from 'ionic-angular';
// import { TeacherreviewsPage } from '../teacherreviews/teacherreviews';

// home page data
// import { MyStorage } from '../../app/localstorage';
import { Auth } from '../../providers/auth';
import { MyTools } from '../../providers/tools';
import { AppSettings } from '../../app/appSettings';
// import { PublicprofilePage } from '../publicprofile/publicprofile';
// import { ChatPage } from  '../chat/chat';
import * as firebase from 'Firebase';
// home page data
mobiscroll.settings = {
  theme: 'ios'
};
@IonicPage()
@Component({
  selector: 'page-schoolprofile',
  templateUrl: 'schoolprofile.html',
  providers: [Services, Auth, MyTools],
})
export class SchoolprofilePage {
  schooltabs: string = "days";
  noticountdata:any='';
  userData:any='';
  schoolDay : any ={
    Day :[],
    TimeSlote :[],
    Standard :[],
    Type : 'Days',
    Description :'',
  };
  Standard : any;
  schoolPeriod : any={
    ToDate :'',
    FromDate :'',
    TimeSlote :[],
    Standard :[],
    Type : 'Period',
    Description :'',
  };
  seldays:any={Monday:'',Tuesday:'',Wednesday:'',Thursday:'',Friday:'',Saturday:'',Sunday:''};
  seltimeslots:any={slot1:'',slot2:'',slot3:'',slot4:'',slot5:'',slot6:'',slot7:''};
  selstandrads:any={};
  test:any='';
  datasavedays:any='';
  datasaveperiods:any='';
  matchingtabs:any='setting';
  // home page data
  // data = { nickname:"" };
  // rooms = [];
  // ref = firebase.database().ref('chatrooms/');
  loader: any;
  // teacherList: any;
  // userDetail: any;
  // searchCriteria: any;
  // LogoUrl = AppSettings.LogoUrl;
  // home page data
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public events: Events,
    public services: Services,
    private sanitizer: DomSanitizer,
    private alertCtrl: AlertController,
    // home page data
    // public tools: MyTools,
    // home page data
    ) {
      // console.log('this.test',this.test);
       
      this.storage.get('user').then((val) => {
          this.userData=val;
          // this.storage.get('searchCriteriadays').then((daysdata) => {
            // this.datasavedays=daysdata;
            // this.storage.get('searchCriteriaperiods').then((periodsdata) => {
              // this.datasaveperiods=periodsdata;
              // this.storage.get('selectdays').then((selectdays) => {
                // this.seldays=selectdays;
                // this.storage.get('selectperiods').then((selectperiods) => {
                  // this.seltimeslots=selectperiods;
                  // this.storage.get('selectstandrads').then((selectstandrads) => {
                    // this.schoolDay.Standard=periodsdata;
                    // console.log('this.datasaveperiods',this.datasaveperiods);
                    // console.log('this.datasavedays',this.datasavedays);
                    // console.log('this.seldays',this.seldays);
                    // console.log('this.seltimeslots',this.seltimeslots);
                    // console.log('this.schoolDay.Standard',this.schoolDay.Standard);
          //         });
          //       });
          //     });
          //   });
          // });
          setTimeout(() => {
            this.getFav();
            this.getstandrads();
          }, 500);
      });
    
    // home page data
    // this.ref.on('value', resp => {
    //   this.rooms = [];
    //   this.rooms = snapshotToArray(resp);
    // });
    // //this.teacherService();
    // this.storage.get('user').then(
    //   (val) => {
    //     if (val != null) {
    //       console.log(val);
    //       this.data.nickname = val.UserName;
    //       this.userDetail = val;
    //     }
    //   }
    // )
    // this.storage.get('searchCriteria').then(
    //   (val) => {
    //     if (val != null) {
    //       console.log('val',val);
    //       this.searchCriteria = val;
    //       if(val.Type=='Days')
    //         this.matchByDay1();
    //       else
    //       this.matchByPeriod2();
    //     }
    //   }
    // )
    // home page data
  }
  // changestate(eve){
  //   console.log('this.test',this.test);
  // }
 getstandrads(){
  this.services.getStandards().subscribe(
    //Successfully Logged in
    success => {
      console.log('Success : ',success);
      this.Standard = success.userData;
      this.getnotificationcount();
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
  // homepagefun(){
  //   console.log('this.test',this.test);
       
  //     this.storage.get('user').then((val) => {
  //         this.userData=val;
  //         this.storage.get('searchCriteriadays').then((daysdata) => {
  //           this.datasavedays=daysdata;
  //           this.storage.get('searchCriteriaperiods').then((periodsdata) => {
  //             this.datasaveperiods=periodsdata;
  //             this.storage.get('selectdays').then((selectdays) => {
  //               this.seldays=selectdays;
  //               this.storage.get('selectperiods').then((selectperiods) => {
  //                 this.seltimeslots=selectperiods;
  //                 this.storage.get('selectstandrads').then((selectstandrads) => {
  //                   this.storage.get('user').then(
  //                     (val) => {
  //                       if (val != null) {
  //                         console.log(val);
  //                         this.data.nickname = val.UserName;
  //                         this.userDetail = val;
  //                       }
  //                     }
  //                   )
  //                   this.storage.get('searchCriteria').then(
  //                     (val) => {
  //                       if (val != null) {
  //                         console.log('val',val);
  //                         this.searchCriteria = val;
  //                         if(val.Type=='Days')
  //                           this.matchByDay1();
  //                         else
  //                         this.matchByPeriod2();
  //                       }
  //                     }
  //                   )
  //                   // this.schoolDay.Standard=periodsdata;
  //                   console.log('this.datasaveperiods',this.datasaveperiods);
  //                   console.log('this.datasavedays',this.datasavedays);
  //                   console.log('this.seldays',this.seldays);
  //                   console.log('this.seltimeslots',this.seltimeslots);
  //                   // console.log('this.schoolDay.Standard',this.schoolDay.Standard);
  //                 });
  //               });
  //             });
  //           });
  //         });
  //     });
  //   //this.teacherService();
    
  // }
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
  // loader
  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolprofilePage');
  }

  matchByDay(){
    if (this.schoolDay.Day == '') {
      this.loader.dismiss();
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter Day');
      }, 500);
      return;
    }
    else if (this.schoolDay.TimeSlote == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Time Slote');
      }, 500);
      return;
    }
    else if (this.schoolDay.Standard == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Standard');
      }, 500);
      return;
    }
    this.storage.set('searchCriteria',this.schoolDay);
    this.navCtrl.push(HomePage);
    
  }
  // matchByPeriod1(){
  //   this.storage.set('searchCriteriadays',this.schoolDay);
  //   this.storage.set('searchCriteriaperiods',this.schoolPeriod);
  //   this.storage.set('selectdays',this.seldays);
  //   this.storage.set('selectperiods',this.seltimeslots);
  //   this.storage.set('selectstandrads',this.schoolDay.Standard);
  //   console.log('schoolDay : ',this.schoolDay);
  //   console.log('schoolPeriod : ',this.schoolPeriod);
  //   console.log('selectdays : ',this.seldays);
  //   console.log('selectperiods : ',this.seltimeslots);
  //   console.log('selectstandrads : ',this.schoolDay.Standard);
  //   // this.homepagefun();
  // }

  matchByPeriod(){
    if (this.schoolPeriod.ToDate == '') {
      // this.loader.dismiss();
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter To Date');
      }, 500);
      return;
    }
    else if (this.schoolPeriod.FromDate == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your From Date');
      }, 500);
      return;
    }
    else if (this.schoolPeriod.Standard == '') {
      setTimeout(() => {
        this.presentAlert('Alert!', 'Please enter your Standard');
      }, 500);
      return;
    }
    console.log('schoolDay : ',this.schoolDay);
    console.log('schoolPeriod : ',this.schoolPeriod);
    this.storage.set('searchCriteria',this.schoolPeriod);
    this.navCtrl.push(HomePage);
    
   }

   getnotificationcount(){
     console.log(this.userData.Id);
    let body = new FormData();
    body.append('userId', this.userData.Id);
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
  if(this.schoolDay.Day.indexOf(value)<0){
    this.schoolDay.Day.push(value);
  }else{
    this.schoolDay.Day.splice(this.schoolDay.Day.indexOf(value), 1);     
  }
  
  
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
  console.log('tet',this.seldays);
  
}
toggletimeslot(value,type){
  if(type=='day'){
    if(this.schoolDay.TimeSlote.indexOf(value)<0){
      this.schoolDay.TimeSlote.push(value);
    }else{
      this.schoolDay.TimeSlote.splice(this.schoolDay.TimeSlote.indexOf(value), 1);     
    }
  }else{
    if(this.schoolPeriod.TimeSlote.indexOf(value)<0){
      this.schoolPeriod.TimeSlote.push(value);
    }else{
      this.schoolPeriod.TimeSlote.splice(this.schoolPeriod.TimeSlote.indexOf(value), 1);     
    }
  }
  
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
  togglestandrads(value, type){
    if(type=='day'){
      if(this.schoolDay.Standard.indexOf(value)<0){
        this.schoolDay.Standard.push(value);
      }else{
        this.schoolDay.Standard.splice(this.schoolDay.Standard.indexOf(value), 1);     
      }
    }else{
      if(this.schoolPeriod.Standard.indexOf(value)<0){
        this.schoolPeriod.Standard.push(value);
      }else{
        this.schoolPeriod.Standard.splice(this.schoolPeriod.Standard.indexOf(value), 1);     
      }
    }
    
    
  }
  getFav() {
    let body = new FormData();
    body.append('UserID',this.userData.Id);
        this.services.getFav(body).subscribe(
          //Successfully Logged in
          success => {
            console.log('favlist ::::', success);
            this.storage.set('favlist', success);
          },
          error => {
            console.log('error bhai favlist', error);
            // this.presentAlert('Alert!', error.message);
          }
        )
  }
  getImgContent() {
    return this.sanitizer.bypassSecurityTrustUrl(this.userData.LogoPath);
  }
  presentAlert(title1,msgs) {
    let alert = this.alertCtrl.create({
      title: title1,
      message: msgs,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  // home page data
//   sanitizerfn(img){
//     return this.sanitizer.bypassSecurityTrustUrl('data:image/*;charset=utf-8;base64,'+img);
//   }

  
//   matchByDay1(){
//     this.showLoader();
//     let body = new FormData();
//     body.append('Day', this.searchCriteria.Day);
//     body.append('TimeSlote', this.searchCriteria.TimeSlote);
//     body.append('Standard', this.searchCriteria.Standard);
//     body.append('SchoolId', this.userDetail.Id);
//     body.append('userId', this.userDetail.userId);
//     this.services.getMatchesByDay(body).subscribe(
//       //Successfully Logged in
//       success => {
//         console.log('Success : ',success);
//         this.teacherList = success.data;
//         this.loader.dismiss();
//       },
//       error => {
//         setTimeout(() => {
//             this.presentAlert('Alert!', error.message);
//             this.loader.dismiss();
          
//         }, 500);
//       }
//     )
    
//   }


//   matchByPeriod2(){
//     this.showLoader();
//     let body = new FormData();
//     body.append('ToDate', this.searchCriteria.ToDate);
//     body.append('FromDate', this.searchCriteria.FromDate);
//     body.append('TimeSlote', this.searchCriteria.TimeSlote);
//     body.append('Standard', this.searchCriteria.Standard);
//     body.append('SchoolId', this.userDetail.Id);
//     this.services.getMatchesByPeriod(body).subscribe(
//       //Successfully Logged in
//       success => {
//         console.log('Success : ',success);
//         this.teacherList = success.data;
//         this.loader.dismiss();
//       },
//       error => {
//         setTimeout(() => {
//             this.presentAlert('Alert!', error.message);
//             this.loader.dismiss();          
//         }, 500);
//       }
//     )
    
//    }


//   presentAlert(title1,msgs) {
//     let alert = this.alertCtrl.create({
//       title: title1,
//       message: msgs,
//       buttons: ['Dismiss']
//     });
//     alert.present();
//   }
//   //Show Loader
//   showLoader() {
//     this.loader = this.tools.getLoader();
//     this.loader.present();
//   }
  
  
// teacherService() {
  
//   this.showLoader();
//   //Applying Validations
  
   
//   //Requesting API 
//       this.services.getTeachers().subscribe(
//         //Successfully Logged in
//         success => {
//           console.log('success bhai', success);
//           this.teacherList = success.teacherList;
//             this.loader.dismiss();

//         },
//         error => {
//           this.loader.dismiss();
//           console.log('error bhai', error);
//           this.presentAlert('Alert!', error.data);
//         }
//       )
      
  
// }

// addToFav(dID){
//   this.showLoader();
//   //Applying Validations
//   let body = new FormData();
//   body.append('userId', this.userDetail.Id);
//   body.append('DeputyPersonId', dID);
//       this.services.addToFav(body).subscribe(
//         //Successfully Logged in
//         success => {
//           console.log('success bhai', success);
//             this.loader.dismiss();
//             this.presentAlert('Alert!', 'Teacher added to your favourite list');

//         },
//         error => {
//           this.loader.dismiss();
//           console.log('error bhai', error);
//           this.presentAlert('Alert!', error.message);
//         }
//       )
// }
// profilepage(idd){
//   console.log('idd',idd);
//   this.navCtrl.push(PublicprofilePage,{
//     id: idd
//   })
// }


// inviteTeacher(id){
//   this.showLoader();
//   let body = new FormData();
//   body.append('userId', this.userDetail.Id);
//   body.append('toUserId',id );console.log(id);
  
//   this.services.SendNotification(body).subscribe(
//     //Successfully Logged in
//     success => {
     
//       setTimeout(() => {
//         this.presentAlert('Success!', 'Notification send to teacher.');
//         this.loader.dismiss();  
//       })
        
//     },
//     error => {
//       setTimeout(() => {
//           this.presentAlert('Alert!', error.message);
//           this.loader.dismiss();        
//       }, 500);
//     }
//   )
// }

  
// startChat() {
//   this.addRoom();

// }



// joinRoom(key) {
//   this.navCtrl.setRoot(ChatPage, {
//     key:key,
//     nickname:this.data.nickname
//   });
// }

// addRoom() {
//   var num =Math.floor((Math.random() * 100) + 1);
//   console.log('num : ',num);
  
  
//   let newData = this.ref.push();
//   newData.set({
//     roomname: "Room-"+num
//   });
//   console.log('this.rooms : ',this.rooms);
//   console.log('this.roomslength : ',this.rooms.length);
//   this.joinRoom(this.rooms[this.rooms.length-1]['key']);
// }
// home page data
// rateteacher(){
//   this.navCtrl.push(TeacherreviewsPage);
// }
// rateteaher1(){
//   const alert = this.alertCtrl.create({
//     title: 'Rate Teacher:',
//     subTitle: 'test',
//     cssClass: 'alertstar',
//     enableBackdropDismiss:true,
//     buttons: [
//          { text: '1', handler: data => { this.resolveRec(1);}},
//          { text: '2', handler: data => { this.resolveRec(2);}},
//          { text: '3', handler: data => { this.resolveRec(3);}},
//          { text: '4', handler: data => { this.resolveRec(4);}},
//          { text: '5', handler: data => { this.resolveRec(5);}}
//     ]
// });
// alert.present();
// }
// resolveRec(ratestar){
//   console.log(ratestar);
// }
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
}