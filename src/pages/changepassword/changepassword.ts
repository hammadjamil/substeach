import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Services } from '../../assets/providers/services';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { EditprofilePage } from '../editprofile/editprofile';

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  editpgpswd:any='';
  newpswd:any='';
  oldpswd:any='';
  conpswd:any='';
  disableButton;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public services: Services,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
  emptyback(){
    this.navCtrl.pop();
  }
  changeback(){
    this.disableButton = true;
    if(this.oldpswd==''){
      this.disableButton = false;
      this.navCtrl.pop();
    }
    else if(this.newpswd==''){
      let alert = this.alertCtrl.create({
        title: 'Change Password',
        subTitle: 'Enter your new password',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else if(this.conpswd==''){
      let alert = this.alertCtrl.create({
        title: 'Change Password',
        subTitle: 'Enter your confirm password',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else if(this.newpswd!=this.conpswd){
      let alert = this.alertCtrl.create({
        title: 'Change Password',
        subTitle: 'New password and confirm password does not match',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else if(this.newpswd.length<=5){
      let alert = this.alertCtrl.create({
        title: 'Change Password',
        subTitle: 'Password lenght must be 6 digits',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else{
      this.storage.get('userid').then((val) => {
        this.services.change_pswd(val,this.oldpswd,this.newpswd).subscribe(
          success => {
            let alert = this.alertCtrl.create({
              title: 'Change Password',
              subTitle: success.message,
              buttons: ['OK']
            });
            alert.present();
            console.log('pswd change',success);
            setTimeout(() => {
              this.disableButton = false;
              this.navCtrl.setRoot(EditprofilePage);
            }, 3000);
          },
          err => {
            let alert = this.alertCtrl.create({
              title: 'Change Password',
              subTitle: err.message,
              buttons: ['OK']
            });
            alert.present();
            this.disableButton = false;
            console.log('error', err);
          }
        )
      });
    }
  }
}
