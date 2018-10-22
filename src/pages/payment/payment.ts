import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { AlertController ,Events} from 'ionic-angular';
import { Services } from '../../providers/services';
import { MyTools } from '../../providers/tools';
import { HomePage } from '../home/home';

import { MyStorage } from '../../app/localstorage';
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
  providers: [Services, MyTools],
  // providers: [
  //   FileChooser,
  //   File,
  //   Transfer,
  //   Camera,
  //   FilePath,]
})
export class PaymentPage {
  loader: any;
  userDetail: any;
  user: any = 
  { 
      "number": "",
      "expMonth": "",
      "expYear": "",
      "cvc": ""
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private stripe: Stripe, private http: Http,
    public services: Services, 
    private alertCtrl: AlertController, 
    private storage: MyStorage,
    public tools: MyTools) {
    this.stripe.setPublishableKey('pk_test_anELvfZYT3CKgUubCpD5uov6');
    this.storage.get('user').then(
      (val) => {
        if (val != null) {
          this.userDetail = val;
        }
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  pay(){
    this.showLoader();
    let card = {
      number: this.user.number,
      expMonth: this.user.expMonth,
      expYear: this.user.expYear,
      cvc: this.user.cvc
     };
     
     this.stripe.createCardToken(card)
        .then(token =>{
          console.log('token',token.id);
          let body = new FormData();
          body.append('stripetoken',token.id);
          body.append('amount', '5');
          body.append('SchoolUserId', this.userDetail.Id);
              this.services.stripePayment(body).subscribe(
                //Successfully Logged in
                success => {
                  console.log('success bhai', success);
                    this.loader.dismiss();
                    this.presentAlert('Alert!', 'you have Successfully paid. Now you can avail our premium features.');
                    this.navCtrl.push(HomePage,{})
                },
                error => {
                  this.loader.dismiss();
                  console.log('error bhai', error);
                  this.presentAlert('Alert!', error.message);
                }
              )

        })
        .catch(error =>{
          this.loader.dismiss();
          this.presentAlert('Alert!', error);
          console.error(error);
        });
  }
  

  presentAlert(title1,msgs) {
    let alert = this.alertCtrl.create({
      title: title1,
      message: msgs,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  //Show Loader
  showLoader() {
    this.loader = this.tools.getLoader();
    this.loader.present();
  }


}
