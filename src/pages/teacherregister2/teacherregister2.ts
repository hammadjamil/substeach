
import { Teacherregister3Page } from '../teacherregister3/teacherregister3';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
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
    private alertCtrl: AlertController,private base64: Base64,
    public chooser: Chooser) {
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


   loadDoc(){
    this.fileChooser.open()
    .then(uri =>{
      this.basefile =uri;
      console.log(uri);
      this.base64.encodeFile(uri).then((base64File: string) => {
        base64File;
        this.storage.set('file',this.basefile);
        this.presentAlert('Success!', 'You File successfully uploaded');
        console.log('base64File :',base64File);
      }, (err) => {
        console.log('errpr',err);
      });
    })
    .catch(e => console.log(e));
    //    this.chooser.getFile('application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation, text/plain')
    //   .then(file => {
    //     console.log('fileeeeeeeeeeee',file );
    //   console.log(file ? file.name : 'canceled')})
    // .catch((error: any) =>{console.error('upload :',error)});
   }
}
