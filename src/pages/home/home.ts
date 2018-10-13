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
  teacherList: any;
  userDetail: any;
  searchCriteria: any;
  LogoUrl = AppSettings.LogoUrl;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,
    public services: Services, private storage: MyStorage,
    public tools: MyTools,
    private alertCtrl: AlertController, public navParams: NavParams) {
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
          }
        }
      )
      this.storage.get('searchCriteria').then(
        (val) => {
          if (val != null) {
            console.log('val',val);
            this.searchCriteria = val;
            if(val.Type=='Days')
              this.matchByDay();
            else
            this.matchByPeriod();
          }
        }
      )
  }

  
  matchByDay(){
    this.showLoader();
    let body = new FormData();
    body.append('Day', this.searchCriteria.Day);
    body.append('TimeSlote', this.searchCriteria.TimeSlote);
    body.append('Standard', this.searchCriteria.Standard);
    body.append('SchoolId', this.userDetail.Id);
    body.append('userId', this.userDetail.userId);
    this.services.getMatchesByDay(body).subscribe(
      //Successfully Logged in
      success => {
        console.log('Success : ',success);
        this.teacherList = success.data;
        this.loader.dismiss();
      },
      error => {
        setTimeout(() => {
            this.presentAlert('Alert!', error.message);
            this.loader.dismiss();
          
        }, 500);
      }
    )
    
  }


  matchByPeriod(){
    this.showLoader();
    let body = new FormData();
    body.append('ToDate', this.searchCriteria.ToDate);
    body.append('FromDate', this.searchCriteria.FromDate);
    body.append('TimeSlote', this.searchCriteria.TimeSlote);
    body.append('Standard', this.searchCriteria.Standard);
    body.append('SchoolId', this.userDetail.Id);
    this.services.getMatchesByPeriod(body).subscribe(
      //Successfully Logged in
      success => {
        console.log('Success : ',success);
        this.teacherList = success.data;
        this.loader.dismiss();
      },
      error => {
        setTimeout(() => {
            this.presentAlert('Alert!', error.message);
            this.loader.dismiss();          
        }, 500);
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
teacherService() {
  
  this.showLoader();
  //Applying Validations
  
   
  //Requesting API 
      this.services.getTeachers().subscribe(
        //Successfully Logged in
        success => {
          console.log('success bhai', success);
          this.teacherList = success.teacherList;
            this.loader.dismiss();

        },
        error => {
          this.loader.dismiss();
          console.log('error bhai', error);
          this.presentAlert('Alert!', error.data);
        }
      )
      
  
}

addToFav(dID){
  this.showLoader();
  //Applying Validations
  let body = new FormData();
  body.append('userId', this.userDetail.Id);
  body.append('DeputyPersonId', dID);
      this.services.addToFav(body).subscribe(
        //Successfully Logged in
        success => {
          console.log('success bhai', success);
            this.loader.dismiss();
            this.presentAlert('Alert!', 'Teacher added to your favourite list');

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


inviteTeacher(id){
  this.showLoader();
  let body = new FormData();
  body.append('userId', this.userDetail.Id);
  body.append('toUserId',id );console.log(id);
  
  this.services.SendNotification(body).subscribe(
    //Successfully Logged in
    success => {
     
      setTimeout(() => {
        this.presentAlert('Success!', 'Notification send to teacher.');
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