import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Services } from '../../assets/providers/services';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { EditprofilePage } from '../editprofile/editprofile';

@IonicPage()
@Component({
  selector: 'page-changedob',
  templateUrl: 'changedob.html',
})
export class ChangedobPage {
  editpgdob:any='';
  newdob:any='';
  maxDate:any;
  currentdate:any;
  disableButton;
  diffdate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public services: Services,private alertCtrl: AlertController) {
    this.editpgdob = this.navParams.get('dob');
    this.newdob=this.editpgdob;
    this.maxDate = new Date().toISOString();
    this.currentdate = new Date().toISOString();
    console.log('this.newdob', this.newdob);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangedobPage');
  }
  emptyback(){
    this.navCtrl.pop();
  }
  changeback(){
    this.disableButton = true;
    if(this.newdob==this.editpgdob){
      console.log('no change');
      this.disableButton = false;
      this.navCtrl.pop();
    }
    else{
      this.diffdate=this.currentdate-this.newdob;
      console.log(this.diffdate);
      if(this.newdob+18>this.currentdate){
        console.log('hamzaa');
      }
      this.storage.get('userid').then((val) => {
        this.services.change_dob(val,this.newdob).subscribe(
          success => {
            console.log('DOB change',success);
            setTimeout(() => {
              this.disableButton = false;
              this.navCtrl.setRoot(EditprofilePage);
            }, 3000);
            
          },
          err => {
            this.disableButton = false;
            let alert = this.alertCtrl.create({
              title: 'Change DOB',
              subTitle: err.message,
              buttons: ['OK']
            });
            alert.present();
            console.log('error', err);
          }
        )
      });
      console.log('change');
    }
  }
}
