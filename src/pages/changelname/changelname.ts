import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Services } from '../../assets/providers/services';
import { Storage } from '@ionic/storage';
import { EditprofilePage } from '../editprofile/editprofile';

@IonicPage()
@Component({
  selector: 'page-changelname',
  templateUrl: 'changelname.html',
})
export class ChangelnamePage {
  editpglname:any='';
  newlname:any='';
  disableButton;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public services: Services) {
    this.editpglname = this.navParams.get('lname');
    this.newlname=this.editpglname;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangelnamePage');
  }
  emptyback(){
    this.navCtrl.pop();
  }
  changeback(){
    this.disableButton = true;
    if(this.newlname==this.editpglname){
      console.log('no change');
      this.disableButton = false;
      this.navCtrl.pop();
    }
    else{
      this.storage.get('userid').then((val) => {
        this.services.change_lname(val,this.newlname).subscribe(
          success => {
            console.log('eLAst name change',success);
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
