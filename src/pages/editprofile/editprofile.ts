import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';

import { LoadingController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/takeUntil';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { AlertController ,Events} from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Services } from '../../assets/providers/services';
import { ChangeemailPage } from '../changeemail/changeemail';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { ChangedobPage } from '../changedob/changedob';
import { ChangefnamePage } from '../changefname/changefname';
import { ChangelnamePage } from '../changelname/changelname';
import { ChangetimezonePage } from '../changetimezone/changetimezone';
import { ChangebillinginfoPage } from '../changebillinginfo/changebillinginfo';
import { SubscriptionPage } from '../subscription/subscription';

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
  providers: [
    File,
    FileTransfer,
    Camera]
})
export class EditprofilePage {
  editprofilelist:any='';
  profileimgurl:any='';
  uid:any='';
  title:any;
  timestamp:any='';
  imgurl:any='';
  //camera plugin
  spin:any=0;
  imageURI:any='';
  imageFileName:any='';
  sourceType:any;
  lastImage: any;
  fileSelected = false;
  disableButton; 
  //camera plugin
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    private transfer: FileTransfer,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public events: Events,
    public services: Services) {
      this.timestamp='';
      this.storage.get('userid').then((val) => {
        this.uid=val;
        console.log('uid',this.uid);
      });
      this.storage.get('thumbnail').then((val) => {
        this.profileimgurl=val;
        this.timefun();
        console.log('thumbnail url ::::',);
        this.editprofile();
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }
  editprofile(){
    this.storage.get('userid').then((val) => {
      this.services.editprofiledata(val).subscribe(
        success => {
            this.editprofilelist = success.data;
          console.log('hamza data profilelist::', this.editprofilelist);
        },
        err => {
          console.log('error', err);
        }
      )
      
    });
  }
  opencamera(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 1, //PHOTOLIBRARY : 0, CAMERA : 1, SAVEDPHOTOALBUM : 2
      // cameraDirection:1, //BACK: 0 FRONT: 1
      saveToPhotoAlbum: true,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imagePath) => {
      this.imageURI = imagePath;
      console.log('opencamera img :::::',this.imageURI);
    }, (err) => {
    //  this.presentToast(err);
    });
  }
  opengallery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0, //PHOTOLIBRARY : 0, CAMERA : 1, SAVEDPHOTOALBUM : 2
      saveToPhotoAlbum: true
    }
    this.camera.getPicture(options).then((imagePath) => {
      this.imageURI = imagePath;
      console.log('opengallery img :::::::',this.imageURI);
    }, (err) => {
    //  this.presentToast(err);
    });
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Change Profile picture',
      buttons: [
        {
          text: 'Upload From Camera',
          handler: () => {
            console.log('Camera clicked');
            this.opencamera();
          }
        },{
          text: 'Upload From Gallery/Photo Album',
          handler: () => {
            console.log('Photo Album clicked');
            this.opengallery();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  cancelupload(){
    this.imageURI='';
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  uploadimg(){
    this.spin=1;
    this.disableButton = true;
    this.storage.get('userid').then((val) => {
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'image-file',
        fileName: val,
        chunkedMode: false,
        mimeType: "image/jpeg",
        headers: {}
      }
      console.log('this.imageURI ::::',this.imageURI);
      let urlProPic='https://staging.pixxpros.com/service/upload-image?id='+val;
      console.log('this.imageURI ::::',urlProPic);
      fileTransfer.upload(this.imageURI, urlProPic, options)
        .then((data) => {
        let p_data = JSON.parse(data.response);
        if(p_data.code==404){
        console.log(p_data);
        this.presentToast('The image cannot be uploaded. Please try again.');
        this.spin=0;
        this.disableButton = false;
        }
        else{
          this.events.publish('user:login');
          this.timefun();
          console.log(p_data);
          this.presentToast('Your profile photo is updated successfully.');
          this.imageURI='';
          this.spin=0;
          this.disableButton = false;
        }
      }, (err) => {
        console.log(err);
        this.presentToast('The image cannot be uploaded. Please try again.');
        console.log('The image cannot be uploaded. Please try again.',err);
        this.spin=0;
        this.disableButton = false;
      });
    });
  }

  timefun(){
      this.timestamp= Date.now();
      this.timestamp=Math.floor(this.timestamp/1000);
      console.log('time:::::',this.timestamp);
  }

  changeemail(){
    this.navCtrl.push(ChangeemailPage, {email:  this.editprofilelist.email});
  }
  changepswd(){
    this.navCtrl.push(ChangepasswordPage, {pswd: ''});
  }
  changedob(){
    this.navCtrl.push(ChangedobPage, {dob: this.editprofilelist.dob});
  }
  changefname(){
    this.navCtrl.push(ChangefnamePage, {fname: this.editprofilelist.fname});
  }
  changelname(){
    this.navCtrl.push(ChangelnamePage, {lname: this.editprofilelist.lname});
  }
  changetimezone(){
    this.navCtrl.push(ChangetimezonePage, {timezone: this.editprofilelist.timeZone});
  }
  changebillinginfo(){
    this.navCtrl.push(ChangebillinginfoPage, {billing: '' });
  }
  viewsubscription(){
    this.navCtrl.push(SubscriptionPage, {subscription: ''});
  }
}
