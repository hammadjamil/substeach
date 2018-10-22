import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListreviewPage } from './listreview';

@NgModule({
  declarations: [
    ListreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ListreviewPage),
  ],
})
export class ListreviewPageModule {}
