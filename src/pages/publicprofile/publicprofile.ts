import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AlertController ,Events} from 'ionic-angular';
import { Services } from '../../providers/services';
import { MyStorage } from '../../app/localstorage';
import { Auth } from '../../providers/auth';
import { MyTools } from '../../providers/tools';
import { LoadingController, Platform } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { DomSanitizer } from '@angular/platform-browser';
@IonicPage()
@Component({
  selector: 'page-publicprofile',
  templateUrl: 'publicprofile.html',
  providers: [
    File,
    FileTransfer]
})
export class PublicprofilePage {
  loader: any;
  profileList: any='';
  userDetail: any;
  seeprofileid:any=0;
  Documents: any ;
  LogoUrl = AppSettings.LogoUrl;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public services: Services,
    private storage: MyStorage,
    public tools: MyTools,private transfer: FileTransfer, private file: File,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private sanitizer: DomSanitizer) {
      this.seeprofileid = navParams.get('id');
      
      if(this.seeprofileid!=0 && this.seeprofileid!='' && this.seeprofileid!=null){
        this.profileService(this.seeprofileid);        
      }
      else{
        this.storage.get('user').then(
          (val) => {
            if (val != null) {
              console.log('val',val);
              this.userDetail = val;
              if(this.userDetail.RoleId==5){
                this.getDocuments(this.userDetail.Id);
              }
              this.profileService(this.userDetail.Id);
            }
          }
        )
      }
      
      // this.profileService();
  }

  download(name) {
    console.log('name',name);
    
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'http://setchemdemo.ezsoftpk.com/SchoolSubtituionApi/api/documents/'+name;
    fileTransfer.download(url, this.file.externalRootDirectory  + 'new_'+name).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.presentAlert('Alert!', "Document successfully downloaded.");
    }, (error) => {
      console.log(error);
      
      this.presentAlert('Alert!', error);
      // handle error
    });
  }

  
  getDocuments(id){
    let body = new FormData();
    body.append('userId', id);
    this.services.getDocuments(body).subscribe(
      //Successfully Logged in
      success => {
        console.log('Success : ',success);
        this.Documents = success.data;
        console.log('Standard : ',this.Documents);
      },
      error => {
        console.log('error bhai', error);
        setTimeout(() => {
          // if (error.message.length==1){
            this.presentAlert('Alert!', error.message);
            this.loader.dismiss();
          // }
          
        }, 500);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicprofilePage');
  }
  presentAlert(title1,msgs) {
    let alert = this.alertCtrl.create({
      title: title1,
      message: msgs,
      buttons: ['OK']
    });
    alert.present();
  }
  //Show Loader
  showLoader() {
    this.loader = this.tools.getLoader();
    this.loader.present();
  }
  
//Login
profileService(id) {
  this.showLoader();
      this.services.getprofile(id).subscribe(
        //Successfully Logged in
        success => {
          // console.log('profile data', success);
          this.profileList = success.userData;
          if(this.profileList.RoleId==5){
            this.getDocuments(this.profileList.Id);
          }
          console.log('profile data',  this.profileList);
            this.loader.dismiss();
        },
        error => {
          this.loader.dismiss();
          console.log('error bhai', error);
          this.presentAlert('Alert!', error.message);
        }
      )
      
  
}
sanitizerfn(img){
  return this.sanitizer.bypassSecurityTrustUrl('data:image/*;charset=utf-8;base64,'+img);
}

}
