
import { Component , ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import * as firebase from 'Firebase';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  rooms = [];
  ref = firebase.database().ref('chatrooms/');
  
   
    data = { type:'', nickname:'', message:'' };
    chats = [];
    roomkey:string;
    nickname:string;
    offStatus:boolean = false;
    chatusername:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
      this.roomkey = this.navParams.get("key") as string;
      this.nickname = this.navParams.get("nickname") as string;
      this.chatusername = this.navParams.get("chatusername") as string;
      this.data.type = 'message';
      this.data.nickname = this.nickname;
      let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
      joinData.set({
        type:'join',
        user:this.nickname,
        message:this.nickname+' has joined this room.',
        sendDate:Date()
      });
      this.data.message = '';
      firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
        this.chats = [];
        this.chats = snapshotToArray(resp);
        setTimeout(() => {
          if(this.offStatus === false) {
          }
        }, 1000);
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }
  sendMessage() {
    let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    newData.set({
      type:this.data.type,
      user:this.data.nickname,
      message:this.data.message,
      sendDate:Date()
    });
    this.data.message = '';
  }
  exitChat() {
    let exitData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    exitData.set({
      type:'exit',
      user:this.nickname,
      message:this.nickname+' has exited this room.',
      sendDate:Date()
    });
    this.offStatus = true;
    this.navCtrl.setRoot(ChatPage, {
      nickname:this.nickname
    });
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
};