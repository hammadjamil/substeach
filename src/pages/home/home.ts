import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController ,Events} from 'ionic-angular';
import { Services } from '../../providers/services';
import { MyStorage } from '../../app/localstorage';
import { Auth } from '../../providers/auth';
import { MyTools } from '../../providers/tools';
import { LoadingController, Platform } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';
import { PublicprofilePage } from '../publicprofile/publicprofile';
import { ChatPage } from  '../chat/chat';
import * as firebase from 'Firebase';
import { DomSanitizer } from '@angular/platform-browser';
import { TeacherreviewsPage } from '../teacherreviews/teacherreviews';
import { AddreviewPage } from '../addreview/addreview';

import { ListreviewPage } from '../listreview/listreview';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Services, Auth, MyTools],
})
export class HomePage {
  data = { nickname:"" };
  rooms = [];
  ref = firebase.database().ref('chatrooms/');
  loader: any;
  teacherList: any = '';
  errormsg=0;
  userDetail: any;
  searchCriteria: any;
  LogoUrl = AppSettings.LogoUrl;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public services: Services, 
    private storage: MyStorage,
    public tools: MyTools,
    private alertCtrl: AlertController, 
    public navParams: NavParams,
    private sanitizer: DomSanitizer) {
      this.ref.on('value', resp => {
        this.rooms = [];
        this.rooms = snapshotToArray(resp);
      });
      //this.teacherService();
      this.storage.get('user').then(
        (val) => {
          if (val != null) {
            console.log(val);
            this.data.nickname = val.UserName;
            this.userDetail = val;

            this.storage.get('searchCriteria').then(
              (val) => {
                if (val != null) {
                  console.log('val',val);
                  this.searchCriteria = val;
                    this.matchByDay();
                  
                }
              }
            )


          }
        }
      )
      
  }

  sanitizerfn(img){
    return this.sanitizer.bypassSecurityTrustUrl('data:image/*;charset=utf-8;base64,'+img);
  }

  
  matchByDay(){
    // this.showLoader();
    let body = new FormData();
    body.append('FromDate', this.searchCriteria.FromDate);
    body.append('ToDate', this.searchCriteria.ToDate);
    body.append('Monday', JSON.stringify(this.searchCriteria.Monday));
    body.append('Tuesday', JSON.stringify(this.searchCriteria.Tuesday));
    body.append('Wednesday', JSON.stringify(this.searchCriteria.Wednesday));
    body.append('Thursday', JSON.stringify(this.searchCriteria.Thursday));
    body.append('Friday', JSON.stringify(this.searchCriteria.Friday));
    body.append('Saturday', JSON.stringify(this.searchCriteria.Saturday));
    body.append('Sunday', JSON.stringify(this.searchCriteria.Sunday));
    body.append('userId', this.userDetail.userId);
    body.append('SchoolId', this.userDetail.SchoolID);
    this.services.getMatchesByDay(body).subscribe(
      //Successfully Logged in
      success => {
        console.log('Success : ',success);
        this.teacherList = success.data;
        // this.loader.dismiss();
      },
      error => {
        setTimeout(() => {
            // this.presentAlert('Alert!', error.message);
            // this.loader.dismiss();
            this.teacherList=1;
          
        }, 500);
      }
    )
    
  }


  // matchByPeriod(){
  //   this.showLoader();
  //   let body = new FormData();
  //   body.append('ToDate', this.searchCriteria.ToDate);
  //   body.append('FromDate', this.searchCriteria.FromDate);
  //   body.append('TimeSlote', this.searchCriteria.TimeSlote);
  //   body.append('Standard', this.searchCriteria.Standard);
  //   body.append('userId', this.userDetail.Id);
  //   this.services.getMatchesByPeriod(body).subscribe(
  //     //Successfully Logged in
  //     success => {
  //       console.log('Success : ',success);
  //       this.teacherList = success.data;
  //       this.loader.dismiss();
  //       console.log('teacherList',this.teacherList);
  //       // this.loader.dismiss();
  //     },
  //     error => {
  //       setTimeout(() => {
  //         // console.log('teacherList',this.teacherList);
  //           // this.presentAlert('Alert!', error.message);
  //           // this.errormsg=1
  //           this.loader.dismiss();  
  //           this.teacherList=1;        
  //           // console.log('teacherList',this.teacherList);
  //       }, 500);
  //     }
  //   )
    
  //  }


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
  
  
teacherService() {
  
  // this.showLoader();
  //Applying Validations
  
   
  //Requesting API 
      this.services.getTeachers().subscribe(
        //Successfully Logged in
        success => {
          console.log('success bhai', success);
          this.teacherList = success.teacherList;
            // this.loader.dismiss();

        },
        error => {
          // this.loader.dismiss();
          console.log('error bhai', error);
          this.presentAlert('Alert!', error.data);
        }
      )
      
  
}

addToFav(dID,index)

{
  console.log('index',index);
  this.showLoader();
  //Applying Validations
  let body = new FormData();
  body.append('SchoolID', this.userDetail.SchoolID);
  body.append('TeacherID', dID);
      this.services.addToFav(body).subscribe(
        //Successfully Logged in
        success => {
          console.log('success bhai', success);
            this.loader.dismiss();
            this.presentAlert('Alert!', 'Teacher added to your favourite list');
            this.storage.get('searchCriteria').then(
              (val) => {
                if (val != null) {
                  console.log('val',val);
                  this.searchCriteria = val;
                    this.matchByDay();
                }
              }
            )
        },
        error => {
          this.loader.dismiss();
          console.log('error bhai', error);
          this.presentAlert('Alert!', error.message);
          this.storage.get('searchCriteria').then(
            (val) => {
              if (val != null) {
                console.log('val',val);
                this.searchCriteria = val;
                  this.matchByDay();
              }
            }
          )
        }
      )
}


hire(teacherID){
  this.showLoader();
  //Applying Validations
  let body = new FormData();
  body.append('SchoolUserId', this.userDetail.Id);
  body.append('TeacherUserId', teacherID);
      this.services.bookTeacher(body).subscribe(
        //Successfully Logged in
        success => {
          console.log('success bhai', success);
            this.loader.dismiss();
            this.presentAlert('Alert!', 'Teacher Successfully booked.');
            this.navCtrl.push(HomePage,{})
        },
        error => {
          this.loader.dismiss();
          console.log('error bhai', error);
          this.presentAlert('Alert!', error.message);
        }
      )
}


block(teacherID){
  this.showLoader();
  //Applying Validations
  let body = new FormData();
  body.append('SchoolUserId', this.userDetail.Id);
  body.append('TeacherUserId', teacherID);
      this.services.blockTeacher(body).subscribe(
        //Successfully Logged in
        success => {
          console.log('success bhai', success);
            this.loader.dismiss();
            this.presentAlert('Alert!', 'Teacher Successfully blocked.');
            this.navCtrl.push(HomePage,{})
        },
        error => {
          this.loader.dismiss();
          console.log('error bhai', error);
          this.presentAlert('Alert!', error.message);
        }
      )
}

profilepage(idd){
  console.log('idd',idd);
  this.navCtrl.push(PublicprofilePage,{
    id: idd
  })
}


viewReview(id){
  this.navCtrl.push(ListreviewPage,{
    reviewTeacherID: id,
    reviewSchoolID :this.userDetail.Id
  })
}


inviteTeacher(id){
  this.showLoader();
  let body = new FormData();
  body.append('SenderId', this.userDetail.Id);
  body.append('ReceiverId',id );console.log(id);
  
  this.services.SendNotification(body).subscribe(
    //Successfully Logged in
    success => {
     
      setTimeout(() => {
        this.presentAlert('Success!', 'Notification send to teacher.');
        this.loader.dismiss();  
      })
        
    },
    error => {
      setTimeout(() => {
          this.presentAlert('Alert!', error.message);
          this.loader.dismiss();        
      }, 500);
    }
  )
}

addReview(id){
  // this.storage.set('reviewTeacherID',id);
  // this.storage.set('reviewSchoolID',this.userDetail.Id);
  this.navCtrl.push(AddreviewPage,{
    reviewTeacherID: id,
    reviewSchoolID :this.userDetail.Id
  })
}

  
startChat() {
  this.addRoom();
}



joinRoom(key) {
  this.navCtrl.setRoot(ChatPage, {
    key:key,
    nickname:this.data.nickname
  });
}

addRoom() {
  var num =Math.floor((Math.random() * 100) + 1);
  console.log('num : ',num);
  
  
  let newData = this.ref.push();
  newData.set({
    roomname: "Room-"+num
  });
  console.log('this.rooms : ',this.rooms);
  console.log('this.roomslength : ',this.rooms.length);
  this.joinRoom(this.rooms[this.rooms.length-1]['key']);
}

rateteacher(){
  this.navCtrl.push(TeacherreviewsPage);
}
rateteaher1(){
  const alert = this.alertCtrl.create({
    title: 'Rate Teacher:',
    subTitle: 'test',
    cssClass: 'alertstar',
    enableBackdropDismiss:true,
    buttons: [
         { text: '1', handler: data => { this.resolveRec(1);}},
         { text: '2', handler: data => { this.resolveRec(2);}},
         { text: '3', handler: data => { this.resolveRec(3);}},
         { text: '4', handler: data => { this.resolveRec(4);}},
         { text: '5', handler: data => { this.resolveRec(5);}}
    ]
});
alert.present();
}
resolveRec(ratestar){
  console.log(ratestar);
}

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