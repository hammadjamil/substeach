import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController ,Events} from 'ionic-angular';
import { Services } from '../../providers/services';
import { MyStorage } from '../../app/localstorage';
import { Auth } from '../../providers/auth';
import { MyTools } from '../../providers/tools';
import { LoadingController, Platform } from 'ionic-angular';
import { AppSettings } from '../../app/appSettings';

import { DocumentViewer,DocumentViewerOptions  } from '@ionic-native/document-viewer';
import { ActionSheetController } from 'ionic-angular'
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer' ;

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path'; 
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64';
import { Chooser } from '@ionic-native/chooser';
import { DomSanitizer } from '@angular/platform-browser';
import { PublicprofilePage } from '../publicprofile/publicprofile';
import { SchoolprofilePage } from '../schoolprofile/schoolprofile';
import { TeacherprofilePage } from '../teacherprofile/teacherprofile';

import { SettingsPage } from '../settings/settings';
// import { DocumentViewer ,DocumentViewerOptions} from '@ionic-native/document-viewer';


declare let cordova: any;
@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
  providers: [
    FileChooser,
    File,
    Transfer,
    Camera,FileTransfer,
    FilePath]
})
export class EditprofilePage {
  loader: any;
  profileList: any='';
  userDetail: any;
  region: any;
  LogoUrl = AppSettings.LogoUrl;
  fileSelected = false;
  lastImage: any;
  logo: any ='';
  Documents:any;
  baseUrl = AppSettings.API;
  public baseLogo ='';
  user = { username: '', password: '', udid: '',platform:'' };
  
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public services: Services,
    private storage: MyStorage,
    private auth: Auth,
    public tools: MyTools,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    private fileChooser: FileChooser,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfernew: Transfer,
    // private file: File,
    private filePath: FilePath,
    public platform: Platform,
    private base64: Base64,
    public chooser: Chooser,
    private document: DocumentViewer,
    private sanitizer: DomSanitizer,
    private transfer: FileTransfer, private file: File,) {
      this.storage.get('user').then(
        (val) => {
          if (val != null) {
            console.log('val',val);
            this.userDetail = val;
             if(this.userDetail.RoleId=='5'){
                this.getDocuments(this.userDetail.Id);
              }
            this.profileService(this.userDetail);
          }
        }
      )


      this.services.getRegions().subscribe(
        //Successfully Logged in
        success => {
          console.log('success bhai', success);
          this.region = success.data
          setTimeout(() => {
            console.log('login success',success);
            
          }, 500);
  
        },
        error => {
          this.loader.dismiss();
          console.log('error bhai', error);
          this.presentAlert('Alert!', error.message);
        }
      )

  }

  

  /**
   * Profile Photo update
   */

  Selection(name) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Action',
      buttons: [
        {
          text: 'View',
          handler: () => {
            this.view(name)
          }
        },
        {
          text: 'Download',
          handler: () => {
            this.download(name);
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


  view(name){


    let path = null;
 
    // if (this.platform.is('ios')) {
    //   path = this.file.documentsDirectory;
    // } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    // }
 
    const transfer = this.transfer.create();
    transfer.download('http://setchemdemo.ezsoftpk.com/SchoolSubtituionApi/api/documents/'+name, path + 'myfile.pdf').then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
    });


    // const options: DocumentViewerOptions = {
    //   title: 'My PDF'
    // }
    
    // this.document.viewDocument('http://setchemdemo.ezsoftpk.com/SchoolSubtituionApi/api/documents/'+name, 'application/pdf', options)
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
  goHome(){
    this.navCtrl.pop();
  }
//Login
profileService(userdata) {
          this.profileList = userdata;
          console.log('this.profileList:',this.profileList);
          
}
updateSchool(){ 
  
  this.showLoader();
  let body = new FormData();
      body.append('SchoolName', this.profileList.SchoolName);
      body.append('Details', this.profileList.Details);
      body.append('VisitingAddress1', this.profileList.VisitingAddress1);
      body.append('VisitingAddress2', this.profileList.VisitingAddress2);
      body.append('VisitingCity', this.profileList.VisitingCity);
      body.append('VisitingPostalCode', this.profileList.VisitingPostalCode);
      body.append('GovtIssuedID', this.profileList.GovtIssuedID);
      body.append('BillingAddress1', this.profileList.BillingAddress1);
      body.append('BillingAddress2', this.profileList.BillingAddress2);
      body.append('BillingCity', this.profileList.BillingCity);
      body.append('BillingPostalCode', this.profileList.BillingPostalCode);
      body.append('BillingCountry', this.profileList.BillingCountry);
      body.append('userId', this.profileList.userId);
      body.append('SchoolID', this.profileList.SchoolID);
      
      this.services.updateSchool(body).subscribe(
        //Successfully Logged in
        success => {
          console.log('testtme ');
          
            setTimeout(() => {
              this.getprofilee();
            }, 500);
        },
        error => {
          console.log('error bhai', error);
          this.presentAlert('Alert!', error.message);
                  
        }
      )
}
getprofilee(){
  this.services.getprofile(this.userDetail.Id).subscribe(
    success =>{
      console.log('success:::::',success.userData);
      this.storage.set('user', success.userData);
      this.presentAlert('Success!', 'You are successfully updated.');
      this.loader.dismiss();
      if(success.userData.RoleId==6){
        this.navCtrl.setRoot(SchoolprofilePage,{});
      }
      else
      {
        this.navCtrl.setRoot(TeacherprofilePage,{});                      
      }
    },error =>{
      this.presentAlert('Alert!',error.data);
      this.loader.dismiss();
    }
  )
}
getprofilee1(){
  this.services.getprofile(this.userDetail.Id).subscribe(
    success =>{
      console.log('success:::::',success.userData);
      this.storage.set('user', success.userData);
      this.loader.dismiss();
      if(success.userData.RoleId==6){
        this.navCtrl.setRoot(SchoolprofilePage,{});
      }
      else
      {
        this.navCtrl.setRoot(TeacherprofilePage,{});                      
      }
    },error =>{
      this.presentAlert('Alert!',error.data);
      this.loader.dismiss();
    }
  )
}
updateTeacher(){
  this.showLoader();
  let body = new FormData();
  body.append('FirstName', this.profileList.FirstName);
  body.append('LastName', this.profileList.LastName);
  body.append('userId', this.profileList.userId);
      body.append('SchoolID', this.profileList.ClientID);
      this.services.updateTeacher(body).subscribe(
        //Successfully Logged in
        success => {
            setTimeout(() => {
              this.getprofilee();
            }, 500);
        },
        error => {
          console.log('error bhai', error);
          setTimeout(() => {
              this.presentAlert('Alert!', error.message);
              this.loader.dismiss();
          }, 500);
        }
      )
  }



  getImgContent() {
      return this.LogoUrl+this.baseLogo;
  }

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
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            // this.getprofilee();
          });
      } 
      else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        // this.getprofilee();
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
    

    const fileTransfer: TransferObject = this.transfernew.create();
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loader.dismiss();
      console.log('data',data.response);
      this.lastImage = data.response;
        this.storage.set('TeacherLogo',this.lastImage);


        this.showLoader();

        let body = new FormData();
          body.append('image', this.lastImage );
          body.append('userId', this.profileList.userId);
          body.append('type', this.userDetail.RoleId);
          
              this.services.updateUserImage(body).subscribe(
                //Successfully Logged in
                success => {
                    this.presentAlert('Success!', 'Your image is successfully uploaded');
                    setTimeout(() => {
                      this.getprofilee1();
                    }, 500);
                },
                error => {
                  // this.spin = 0;
                  console.log('error bhai', error);
                  setTimeout(() => {
                    // if (error.message.length==1){
                      this.presentAlert('Alert!', error.message);
                      this.loader.dismiss();
                    // }
                    
                  }, 500);
                }
              )

              this.getImgContent();

        // this.presentAlert('Success!', 'You File successfully uploaded');
      // let p_data = JSON.parse(data.response);
      
    }, err => {
      this.loader.dismiss();
      console.log('error', err);
    });


  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.fileSelected = true;

      this.logo = this.pathForImage(newFileName);
      this.uploadPhotoService();







      // this.logo = this.pathForImage(newFileName);
      // this.base64.encodeFile(this.logo).then((base64File: string) => {
      //   this.baseLogo = base64File;
        
      //   console.log('tetttttttttt : :',this.baseLogo.replace('data:image/*;charset=utf-8;base64,',''));
      //   this.storage.set('TeacherLogo',this.baseLogo.replace('data:image/*;charset=utf-8;base64,','')
      //   );
      //   this.showLoader();

      //   let body = new FormData();
      //     body.append('image', this.baseLogo.replace('data:image/*;charset=utf-8;base64,','') );
      //     body.append('userId', this.profileList.userId);
      //     body.append('type', this.userDetail.RoleId);
          
      //         this.services.updateUserImage(body).subscribe(
      //           //Successfully Logged in
      //           success => {
      //               // this.presentAlert('Success!', 'Your image is successfully uploaded');
      //               setTimeout(() => {
      //                 this.getprofilee1();
      //               }, 500);
      //           },
      //           error => {
      //             // this.spin = 0;
      //             console.log('error bhai', error);
      //             setTimeout(() => {
      //               // if (error.message.length==1){
      //                 this.presentAlert('Alert!', error.message);
      //                 this.loader.dismiss();
      //               // }
                    
      //             }, 500);
      //           }
      //         )
      //   // this.presentAlert('Success!', 'You File successfully uploaded');
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

settingpage(){
  this.navCtrl.push(SettingsPage);
}
  uploadPhotoCancel() {
    this.fileSelected = false;
    this.logo = '';
    this.lastImage = '';
  }


}
