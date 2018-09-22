import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { Schoolregister3Page } from '../schoolregister3/schoolregister3';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer' ;

import { FilePath } from '@ionic-native/file-path'; 
import { Camera } from '@ionic-native/camera';
import { AppSettings } from '../../app/appSettings';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Services } from '../../providers/services';
declare let cordova: any;
/**
 * Generated class for the Schoolregister2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schoolregister2',
  templateUrl: 'schoolregister2.html',
  providers: [
    FileChooser,
    File,
    Transfer,
    Camera,
    FilePath,]
})
export class Schoolregister2Page {
  fileSelected = false;
  lastImage: any;
  logo: any;
  baseUrl = AppSettings.API;
  constructor(public navCtrl: NavController, public navParams: NavParams,private fileChooser: FileChooser,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public services: Services,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Schoolregister2Page');
  }
  schoolregister3(){
    this.navCtrl.push(Schoolregister3Page);
  }
  backtologin(){
    this.navCtrl.push(LoginPage);
  }
  skip(){
    this.navCtrl.push(Schoolregister3Page);
  }

  presentAlert(title, msgs) {
    let alert = this.alertCtrl.create({
      title: title,
      // subTitle: msg,
      message: msgs,
      buttons: ['Dismiss']
    });
    alert.present();
  }

   // loader
   getLoader() {
    console.log('showing loader now');
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      showBackdrop: false,
      content: `
      <div class="custom-spinner-container" style="width:30px">
      <img src = "./assets/imgs/loader.gif">
      </div>`
    });
    return loader;
  }
  loader: any;
  showLoader() {
    this.loader = this.getLoader();
    this.loader.present();
  }
  // loader
    
  public takePicture(sourceType) {

    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentAlert('Alert!', "Your photo could not be uploaded. Please upload JPG, JPEG, PNG and Bitmap files");
      console.log('erroro is ', err);
    });

  }


  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.fileSelected = true;

      this.logo = this.pathForImage(newFileName);
    }, error => {
      console.log(error);
    });
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }


  /**
   * Profile Photo update
   */

  uploadPhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  uploadPhotoService() {
    this.showLoader();

    var url = this.baseUrl + "updateProfilePic";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "profilePic",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'fileName': filename,
      }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    fileTransfer.upload(targetPath, url, options).then(data => {
      console.log('updateProfilePic data : ',data);
      
      this.loader.dismiss();
      let p_data = JSON.parse(data.response);
      this.storage.set('profile_image',p_data.data.profile_image);
      this.fileSelected = false;
      console.log('Your profile photo is updated successfully');
      
      // this.presentToast('Your profile photo is updated successfully');
    }, err => {
      this.loader.dismiss();
      console.log('error', err);
      this.fileSelected = false;
    });


  }

  uploadPhotoCancel() {
    this.fileSelected = false;
    this.logo = '';
    this.lastImage = '';
  }














}
