
import { Component , ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import * as firebase from 'Firebase';
import { Keyboard } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  rooms = [];
  ref = firebase.database().ref('chatrooms/');
  btnmargin:any = '';
  btnmargin2:any = '';
  LogoUrl = AppSettings.LogoUrl;
  chatlogo:any;
    data = { type:'', nickname:'', message:'' };
    chats = [];
    roomkey:string;
    nickname:string;
    offStatus:boolean = false;
    chatusername:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private keyboard: Keyboard) {
    this.keyboard.onClose(this.closeCallback);
    
    // this.keyboard.isOpen()
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
      this.roomkey = this.navParams.get("key") as string;
      this.nickname = this.navParams.get("nickname") as string;
      this.chatusername = this.navParams.get("chatusername") as string;
      this.chatlogo = this.navParams.get("chatlogo");
      this.data.type = 'message';
      this.data.nickname = this.nickname;
      let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
      
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
  closeCallback(){
    console.log('Closing time');
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
  keyboardCheck() {
    if(this.keyboard.isOpen()==true){
      this.btnmargin = "250px"
      this.btnmargin2 = "300px"
    }
    else{
      this.btnmargin = "0"
      this.btnmargin2 = "0"
    }
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