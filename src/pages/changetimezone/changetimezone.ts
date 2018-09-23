import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Services } from '../../assets/providers/services';
import { Storage } from '@ionic/storage';
import { EditprofilePage } from '../editprofile/editprofile';

@IonicPage()
@Component({
  selector: 'page-changetimezone',
  templateUrl: 'changetimezone.html',
})
export class ChangetimezonePage {
  editpgtzone:any='';
  newtzone:any='';
  disableButton;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public services: Services) {
    this.editpgtzone = this.navParams.get('timezone');
    console.log('this.editpgtzone',this.editpgtzone);
    this.newtzone=this.editpgtzone;
    console.log('this.newtzone',this.newtzone);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangetimezonePage');
  }
  emptyback(){
    this.navCtrl.pop();
  }
  changeback(){
    this.disableButton = true;
    if(this.newtzone==this.editpgtzone){
      console.log('no change');
      this.disableButton = false;
      this.navCtrl.pop();
    }
    else{
      this.storage.get('userid').then((val) => {
        this.services.change_tzone(val,this.newtzone).subscribe(
          success => {
            console.log('emailchange',success);
            setTimeout(() => {
              this.disableButton = false;
              this.navCtrl.setRoot(EditprofilePage);
            }, 3000);
          },
          err => {
            this.disableButton = false;
            console.log('error', err);
          }
        )
      });
      console.log('change');
    }
  }
}
