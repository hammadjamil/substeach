import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyStorage } from '../../app/localstorage';
import { MyTools } from '../../providers/tools';
import { Services } from '../../providers/services';
import { AppSettings } from '../../app/appSettings';

@IonicPage()
@Component({
  selector: 'page-blocklist',
  templateUrl: 'blocklist.html',
})
export class BlocklistPage {
  userDetail:any='';
  blocklist:any='';
  logopath:any=AppSettings.LogoUrl;
  constructor(public navCtrl: NavController,
    private storage: MyStorage, 
    public navParams: NavParams,
    public services: Services,
    public tools: MyTools) {
    this.storage.get('user').then(
      (val) => {
        if (val != null) {
          console.log('userDetail:::::',val)
          this.userDetail = val;
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad BlocklistPage');
  }

}
