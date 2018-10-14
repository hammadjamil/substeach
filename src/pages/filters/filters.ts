import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-filters', 
  templateUrl: 'filters.html',
})
export class FiltersPage {
  icontestname:any='';
  sports: any = '';
  contesttype: any = '';
  duration: any = '';
  startdate: any = '';
  pushdata:any;
  minDate:any;
  customOptions:any;
  bcontestdur: any;
  bcontesttype: any;
  contestremove:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    this.icontestname=navParams.get('search');
    this.sports = navParams.get('csport');
    this.contesttype = navParams.get('ctype');
    this.duration = navParams.get('cdur');
    this.startdate = navParams.get('cdate');
    this.contestremove = navParams.get('contestremove');
    console.log('contestremove', this.contestremove);
    this.minDate = new Date().toISOString();
    console.log('this.minDate', this.minDate);
    if (this.duration==''){
      this.bcontestdur= 'e';
    }
    else{
      this.bcontestdur = this.duration;
    }
    if (this.contesttype == '') {
      this.bcontesttype = 'e';
    }
    else {
      this.bcontesttype = this.contesttype;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
  }
  
  togglecontest(value){
    if (value == 'pix$'){
      // console.log('togglecontest', value, 'bcontesttype', this.bcontesttype);
      if (this.bcontesttype == 'pix$'){
        this.bcontesttype = 'e';
        this.contesttype = '';
      }
      else{
        this.bcontesttype = 'pix$';
        this.contesttype = 'pix$';
      }
    }
    else if (value == 'paid'){
      // console.log('togglecontest', value, 'bcontesttype', this.bcontesttype);
      if (this.bcontesttype == 'paid') {
        this.bcontesttype = 'e';
        this.contesttype = '';
      }
      else {
        this.bcontesttype = 'paid';
        this.contesttype = 'paid';
      }
    }
    
  }


  
  toggledur(value){
    if (value == '1') {
      // console.log('toggledur', value, 'bcontesttype', this.bcontestdur);
      if (this.bcontestdur == 1) {
        this.bcontestdur = 'e';
        this.duration = '';
      }
      else {
        this.bcontestdur = 1;
        this.duration = 1;
      }
    }
    else if (value == 2) {
      // console.log('toggledur', value, 'bcontesttype', this.bcontestdur);
      if (this.bcontestdur == 2) {
        this.bcontestdur = 'e';
        this.duration = '';
      }
      else {
        this.bcontestdur = 2;
        this.duration = 2;
      }
    }
    else if (value == 3) {
      // console.log('toggledur', value, 'bcontesttype', this.bcontestdur);
      if (this.bcontestdur == 3) {
        this.bcontestdur = 'e';
        this.duration = '';
      }
      else {
        this.bcontestdur = 3;
        this.duration = 3;
      }
    }
    else if (value == 4) {
      // console.log('toggledur', value, 'bcontesttype', this.bcontestdur);
      if (this.bcontestdur == 4) {
        this.bcontestdur = 'e';
        this.duration = '';
      }
      else {
        this.bcontestdur = 4;
        this.duration = 4;
      }
    }

  }
  
  closeModal() {
      this.pushdata={
        icontestname: this.icontestname,
        sports: this.sports,
        contesttype: this.contesttype,
        duration: this.duration,
        startdate: this.startdate
      }
      this.view.dismiss(this.pushdata);
  }
  resetall(){
    this.icontestname = '';
    this.sports = '';
    this.contesttype = '';
    this.duration = '';
    this.startdate = '';
    this.bcontestdur = 'e';
    this.bcontesttype = 'e';
  }
  clearcontestname(){
    this.icontestname = '';
  }
  cleardate(){
    this.startdate='';
  }
}
