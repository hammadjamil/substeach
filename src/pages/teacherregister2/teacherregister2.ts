
import { Teacherregister3Page } from '../teacherregister3/teacherregister3';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform, MenuController} from 'ionic-angular';
import { Schoolregister3Page } from '../schoolregister3/schoolregister3';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
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
declare let cordova: any;
@IonicPage()
@Component({
  selector: 'page-teacherregister2',
  templateUrl: 'teacherregister2.html',
  providers: [
    FileChooser,
    File,
    Transfer,
    Camera,
    FilePath,]
})
export class Teacherregister2Page {
  basefile : any = '';
  baseUrl = AppSettings.API;
  fileName :any='';
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
    private menu: MenuController,
    private alertCtrl: AlertController,private base64: Base64,
    public chooser: Chooser) {
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
  teacherregister3(){
    this.navCtrl.push(Teacherregister3Page);
  }
  back(){
    this.navCtrl.pop();
  }
  skip(){
    this.navCtrl.push(Teacherregister3Page);
  }
  presentAlert(title, msgs) {
    let alert = this.alertCtrl.create({
      title: title,
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


  uploadPhotoService() {
    this.showLoader();

    var url = this.baseUrl + "updateFile";
    console.log('url',url);
    
    // File for Upload
    var targetPath = this.basefile;

    

    // File name only
    var filename = 'document.docx';

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
      
      // let p_data = JSON.parse(data.response);
      
    }, err => {
      this.loader.dismiss();
      console.log('error', err);
    });


  }



  // loader
   loadDoc(){
    this.fileChooser.open()
    .then(uri =>{
      this.basefile =uri;
      console.log(uri);
      this.filePath.resolveNativePath(uri)
        .then((filePath) => {
            console.log(filePath)  ;
            this.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);  
            console.log(this.fileName) ;           
            
            this.base64.encodeFile(filePath).then((base64File: string) => {
              console.log(base64File);
              // this.storage.set('FileCode',base64File.replace('data:image/*;charset=utf-8;base64,',''));
              // this.storage.set('FileName',this.fileName);
            }, (err) => {
              console.log(err);
            });


        }, (err) => {
          console.log(err);
        })
      // this.file.readAsDataURL(uri, 'test.docx')
      // this.uploadPhotoService();
      
    })
    .catch(e => console.log(e));
    
   }

  



}
