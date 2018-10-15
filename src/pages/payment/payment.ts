import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
  // providers: [
  //   FileChooser,
  //   File,
  //   Transfer,
  //   Camera,
  //   FilePath,]
})
export class PaymentPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private stripe: Stripe) {
    this.stripe.setPublishableKey('pk_test_anELvfZYT3CKgUubCpD5uov6');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  pay(){
    
    let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
     };
     
     this.stripe.createCardToken(card)
        .then(token => console.log(token.id))
        .catch(error => console.error(error));
  }
  

}
