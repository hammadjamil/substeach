import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyStorage } from '../../app/localstorage';
import { MyTools } from '../../providers/tools';
import { Services } from '../../providers/services';
import { AppSettings } from '../../app/appSettings';

import * as firebase from 'Firebase';
import { ChatPage } from '../chat/chat';

@IonicPage()
@Component({
  selector: 'page-blocklist',
  templateUrl: 'blocklist.html',
})
export class BlocklistPage {
  data = { nickname:"" };
  rooms = [];
  chatuser:any;
  ref = firebase.database().ref('chatrooms/');
  
  chatlogo:any;
  
  userDetail:any='';
  blocklist:any='';
  logopath:any=AppSettings.LogoUrl;
  constructor(public navCtrl: NavController,
    private storage: MyStorage, 
    public navParams: NavParams,
    public services: Services,
    public tools: MyTools) {
      this.ref.on('value', resp => {
        this.rooms = [];
        this.rooms = snapshotToArray(resp);
      });

    this.storage.get('user').then(
      (val) => {
        if (val != null) {
          console.log('userDetail:::::',val)
          this.userDetail = val;
          this.data.nickname = val.UserName;
          this.getacceptlist();
        }
      }
    )
  }
  getacceptlist(){
    this.services.acceptList(this.userDetail.SchoolID).subscribe(
      //Successfully Logged in
      success => {
        
        console.log('success bhai', success);
        this.blocklist=success.data;
        console.log('blocklist bhai', this.blocklist);

      },
      error => {
        console.log('error bhai', error);
      }
    )
  }
  block(blockid,type){
    this.services.block(blockid,type).subscribe(
      //Successfully Logged in
      success => {
        console.log('success bhai', success);
        this.blocklist='';
        this.getacceptlist();
      },
      error => {
        console.log('error bhai', error);
      }
    )
  }
  book(SchoolID,TeacherID){
    this.services.block(TeacherID,TeacherID).subscribe(
      //Successfully Logged in
      success => {
        console.log('success bhai', success);
        this.blocklist='';
        this.getacceptlist();
      },
      error => {
        console.log('error bhai', error);
      }
    )
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BlocklistPage');
  }

  chatpg(){
    this.navCtrl.push(ChatPage);
  }

  
startChat(no ,chatusername,chatlogo) {
  
  console.log('no',no);
  console.log('chatusername',chatusername);
  console.log('chatlogo',chatlogo);
  this.chatuser=chatusername;
  this.chatlogo=chatlogo;
  this.addRoom(no);
}



joinRoom(key) {
  console.log('this.data.nickname',this.data.nickname,'chatlogo',this.chatlogo);

  this.navCtrl.push(ChatPage, {
    key:key,
    nickname:this.data.nickname,
    chatusername: this.chatuser,
    chatlogo: this.chatlogo
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
    }, 500)

    
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