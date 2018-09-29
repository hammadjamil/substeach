import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MyStorage } from '../app/localstorage';

@Injectable()
export class Auth {

  constructor(private storage: MyStorage) {
  }

  loginUser(data) {
    console.log('insetting in local storage ', data.userData);
    this.storage.set('user', data.userData);
  }

  setUserData(data){
    console.log('setting this user data ',data);
    this.storage.set('user', data);
  }

  setDashInfo(data){
    console.log('setting dash info ', data);
    this.storage.set('dash_info', data);
  }

  setUserImage(data){
    console.log('setting user image ', data);
    this.storage.set('profile_image', data);
  }

  userLoggedIn() {
    let promise = new Promise((resolve, reject) => {
      this.storage.get('token').then((val) => {
      console.log('checking user ', val);
      if (val != null) {
        resolve(val);
       
      } else {
         reject();
      }
    });
      
  });
  
  return promise;
  }

  logout() {
    this.storage.set('token', null);
    this.storage.set('user', null);
  }

  getToken(){
    return this.storage.get('token');
  }

  getUserData(){
    return this.storage.get('user');
  }
  getDashInfo(){
    return this.storage.get('dash_info');
  }
  getUserImage(){
    return this.storage.get('profile_image');
  }

}
