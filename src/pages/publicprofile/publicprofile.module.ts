import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicprofilePage } from './publicprofile';

@NgModule({
  declarations: [
    PublicprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(PublicprofilePage),
  ],
})
export class PublicprofilePageModule {}
