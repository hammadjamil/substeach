import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Services } from '../../assets/providers/services';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { EditprofilePage } from '../editprofile/editprofile';

@IonicPage()
@Component({
  selector: 'page-changeemail',
  templateUrl: 'changeemail.html',
})
export class ChangeemailPage {
  editpgemail:any='';
  newemail:any='';
  emailcheck:boolean;
  disableButton;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public services: Services,private alertCtrl: AlertController) {
    this.editpgemail = this.navParams.get('email');
    this.newemail=this.editpgemail;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeemailPage');
  }
  emptyback(){
    this.navCtrl.pop();
  }
  changeback(){
    this.disableButton = true;
    if(this.newemail==this.editpgemail){
      console.log('no change');
      this.disableButton = false;
      this.navCtrl.pop();
    }
    else{
      this.emailcheck=this.validateEmail(this.newemail);
      if(this.emailcheck==true){
        this.storage.get('userid').then((val) => {
          this.services.change_email(val,this.newemail).subscribe(
            success => {
              let alert = this.alertCtrl.create({
                title: 'Change Email',
                subTitle: success.message,
                buttons: ['OK']
              });
              alert.present();
              console.log('emailchange',success);
              setTimeout(() => {
                this.disableButton = false;
                this.navCtrl.setRoot(EditprofilePage);
              }, 3000);
              
            },
            err => {
              
              console.log('error', err);
            }
          )
          
        });
      }
      else{
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Please enter valid email address',
          buttons: ['OK']
        });
        alert.present();
        this.disableButton = false;
      }
      console.log('change');
      
    }
  }
  //Validate Email using regex
  validateEmail(email) {
    console.log(email);
    var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    if (!regex.test(email)) {
      return false;
    } else {
      console.log('Valid Email');
      return true;
    }
  }
}
