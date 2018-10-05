import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { Services } from '../../providers/services';
import { ChatPage } from '../chat/chat';
import * as firebase from 'Firebase';
@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  data = { nickname:"" };
  rooms = [];
  chatuser:any;
  ref = firebase.database().ref('chatrooms/');
  userID : any;
  Usertype : any;
  teacherList : any;
  userdata:any='';
  notificationList : any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public services: Services,
    private alertCtrl: AlertController) {
      this.ref.on('value', resp => {
        this.rooms = [];
        this.rooms = snapshotToArray(resp);
      });

    this.storage.get('user').then((val) => {
      this.userdata=val;
      this.userID = val.Id;
      this.Usertype = val.Usertype;
      this.data.nickname = val.UserName;
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
  updateStatus(id , status, senderid, room){
    let body = new FormData();
    body.append('userId',  id);
    body.append('status',  status);
    body.append('senderid',  senderid);
    body.append('Usertype',  this.Usertype);
    body.append('room',  room);
    this.services.updateNotification(body).subscribe(
      //Successfully Logged in
      success => {
        console.log('Success : ',success);
        this.getData();
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

  
startChat(no ,chatusername) {
  this.chatuser=chatusername;
  this.addRoom(no);

}



joinRoom(key) {
  console.log('this.data.nickname',this.data.nickname);
  this.navCtrl.setRoot(ChatPage, {
    key:key,
    nickname:this.data.nickname,
    chatusername: this.chatuser
  });
}

addRoom(number) {
  console.log(' this.rooms', this.rooms);
  
  var temp = false;
  this.rooms.forEach(obj => {
    if(obj.roomname == number){
      this.joinRoom(obj.key);
      temp = true;
    }
  });
  if(temp == false){
    let newData = this.ref.push();
    newData.set({
      roomname: number
    });

    setTimeout( () => {
      this.rooms.forEach(obj => {
        if(obj.roomname == number){
          this.joinRoom(obj.key);
        }
      });
      console.log(' this.rooms if', this.rooms);
    }, 1000)

    
  }else{
    console.log(' this.rooms else', this.rooms);
  }

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