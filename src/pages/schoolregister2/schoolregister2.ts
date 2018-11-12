import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform, MenuController} from 'ionic-angular';
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
import { Base64 } from '@ionic-native/base64';
import { Chooser } from '@ionic-native/chooser';
import { DomSanitizer } from '@angular/platform-browser';
declare let cordova: any;

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
  logo: any ='';
  uploadedimg:any='';
  baseUrl = AppSettings.API;
  LogoUrl = AppSettings.LogoUrl;
  public baseLogo ='';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fileChooser: FileChooser,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public services: Services,
    private alertCtrl: AlertController,
    private base64: Base64,
    public chooser: Chooser,
    private menu: MenuController,
    private sanitizer: DomSanitizer) {
    //   this.chooser.getFile('application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation, text/plain')
    //   .then(file => {
    //     console.log('fileeeeeeeeeeee',file );
    //   console.log(file ? file.name : 'canceled')})
    // .catch((error: any) => console.error('upload :',error));
  }

  getImgContent() {
    return this.LogoUrl+this.lastImage;
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Schoolregister2Page');
  }
  schoolregister3(){
    this.navCtrl.push(Schoolregister3Page);
  }
  back(){
    this.navCtrl.pop();
  }
  skip(){
    
    this.navCtrl.push(Schoolregister3Page);
  }

  presentAlert(title, msgs) {
    let alert = this.alertCtrl.create({
      title: title,
      // subTitle: msg,
      message: msgs,
      buttons: ['Ok']
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
      <img src = "./assets/imgs/loader2.gif">
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
      quality: 40,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      console.log('imagePath',imagePath);
      
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
      this.uploadPhotoService();
      // this.base64.encodeFile(this.logo).then((base64File: string) => {
      //   this.baseLogo = base64File;
        
      //   this.storage.set('TeacherLogo',this.baseLogo)
      //   this.presentAlert('Success!', 'You File successfully uploaded');
      //   this.getImgContent();
      //   //console.log('base64File : :',this.baseLogo);
      // }, (err) => {
      //   console.log(err);
      // });
      
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


  uploadPhotoCancel() {
    this.fileSelected = false;
    this.logo = '';
    this.lastImage = '';
  }







  uploadPhotoService() {
    this.showLoader();

    var url = this.baseUrl + "updateImg";
    console.log('url',url);
    
    // File for Upload
    var targetPath = this.logo;

    

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
    console.log('options',options);
    

    const fileTransfer: TransferObject = this.transfer.create();
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loader.dismiss();
      console.log('data',data);
        this.storage.set('TeacherLogo',this.lastImage)
        this.presentAlert('Success!', 'You File successfully uploaded');
        this.baseLogo = this.lastImage;
      // let p_data = JSON.parse(data.response);
      
    }, err => {
      this.loader.dismiss();
      console.log('error', err);
    });


  }

    





}
