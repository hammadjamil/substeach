import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Services } from '../../assets/providers/services';
import { Storage } from '@ionic/storage';
import { EditprofilePage } from '../editprofile/editprofile';

@IonicPage()
@Component({
  selector: 'page-changefname',
  templateUrl: 'changefname.html',
})
export class ChangefnamePage {
  editpgfname:any='';
  newfname:any='';
  disableButton;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public services: Services) {
    this.editpgfname = this.navParams.get('fname');
    this.newfname=this.editpgfname;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangefnamePage');
  }
  emptyback(){
    this.navCtrl.pop();
  }
  changeback(){
    this.disableButton = true;
    if(this.newfname==this.editpgfname){
      console.log('no change');
      this.disableButton = false;
      this.navCtrl.pop();
    }
    else{
      this.storage.get('userid').then((val) => {
        this.services.change_fname(val,this.newfname).subscribe(
          success => {
            console.log('first name change',success);
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
