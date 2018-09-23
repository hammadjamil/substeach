import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Services } from '../../assets/providers/services';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { EditprofilePage } from '../editprofile/editprofile';

@IonicPage()
@Component({
  selector: 'page-changebillinginfo',
  templateUrl: 'changebillinginfo.html',
})
export class ChangebillinginfoPage {
  editpgbilling:any='';
  newbilling:any='';
  disableButton;
  newbillinginfo={id:'',Address:'',City:'',State:'',Zip:'',CCNumber:'',ExpiryDate:'',AuthorizationCode:'',CardholderName:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public services: Services,private alertCtrl: AlertController) {
    this.editpgbilling = this.navParams.get('billing');
    this.newbilling=this.editpgbilling;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangebillinginfoPage');
  }
  emptyback(){
    this.navCtrl.pop();
  }
  changeback(){
    this.disableButton = true;
    
      this.storage.get('userid').then((val) => {
        this.services.changebillinginfo('https://staging.pixxpros.com/service/update-billing-information',val,this.newbillinginfo).subscribe(
          success => {
            let alert = this.alertCtrl.create({
              title: 'Change Billing Address',
              subTitle: success.code,
              buttons: ['OK']
            });
            alert.present();
            console.log('Billing Address Change',success);
            setTimeout(() => {
              this.disableButton = false;
              this.navCtrl.setRoot(EditprofilePage);
            }, 3000);
            
          },
          err => {
            this.disableButton = false;
            console.log('error', err.code);
          }
        )
        
      });
      console.log('change');
  }

  changebackpost(){
    this.disableButton = true;
    if(!this.newbillinginfo.Address){
      let alert = this.alertCtrl.create({
        title: 'Change Billing Address',
        subTitle: 'Address is required',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else if(!this.newbillinginfo.City){
      let alert = this.alertCtrl.create({
        title: 'Change Billing Address',
        subTitle: 'City is required',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else if(!this.newbillinginfo.State){
      let alert = this.alertCtrl.create({
        title: 'Change Billing Address',
        subTitle: 'State is required',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else if(!this.newbillinginfo.Zip){
      let alert = this.alertCtrl.create({
        title: 'Change Billing Address',
        subTitle: 'Zip is required',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else if(!this.newbillinginfo.CCNumber){
      let alert = this.alertCtrl.create({
        title: 'Change Billing Address',
        subTitle: 'Credit Card Number is required',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else if(this.newbillinginfo.CCNumber.length<=3){
      console.log('hamzaa atleast');
      let alert = this.alertCtrl.create({
        title: 'Change Billing Address',
        subTitle: 'Credit Card Number must be atleast 4 digits number',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else if(!this.newbillinginfo.ExpiryDate){
      console.log('hamzaa atleast');
      let alert = this.alertCtrl.create({
        title: 'Change Billing Address',
        subTitle: 'Expiry Date is required',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else if(!this.newbillinginfo.AuthorizationCode){
      console.log('hamzaa atleast');
      let alert = this.alertCtrl.create({
        title: 'Change Billing Address',
        subTitle: 'Authorization Code is required' ,
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else if(!this.newbillinginfo.CardholderName){
      console.log('hamzaa atleast');
      let alert = this.alertCtrl.create({
        title: 'Change Billing Address',
        subTitle: 'Cardholder Name  is required',
        buttons: ['OK']
      });
      alert.present();
      this.disableButton = false;
    }
    else{
      this.disableButton = true;
      this.storage.get('userid').then((val) => {
        this.newbillinginfo.id=val;
        let url='https://staging.pixxpros.com/service/update-billing-information?id='+this.newbillinginfo.id;
        let body = new FormData();
        body.append('id', this.newbillinginfo.id);
        body.append('AuthorizationCode', this.newbillinginfo.AuthorizationCode);
        body.append('CCNumber', this.newbillinginfo.CCNumber);
        body.append('CardholderName', this.newbillinginfo.CardholderName);
        body.append('ExpiryDate', this.newbillinginfo.ExpiryDate);
        body.append('Address', this.newbillinginfo.Address);
        body.append('City', this.newbillinginfo.City);
        body.append('State', this.newbillinginfo.State);
        body.append('Zip', this.newbillinginfo.Zip);
          this.services.changebillinginfopost(url, body).subscribe(
            success => {
              console.log('hamzaaaaaaa changebackpost success', success);
              let alert = this.alertCtrl.create({
                title: 'Change Billing Address',
                subTitle: success.message,
                buttons: ['OK']
              });
              alert.present();
              this.disableButton = false;
              setTimeout(() => {
                this.disableButton = false;
                this.navCtrl.setRoot(EditprofilePage);
              }, 3000);
            },
            error => {
              let alert = this.alertCtrl.create({
                title: 'Change Billing Address',
                subTitle: error.message,
                buttons: ['OK']
              });
              alert.present();
              console.log('error bhai', error);
              this.disableButton = false;
            }
          )
      });
    }
  }
}
