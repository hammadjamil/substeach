import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangetimezonePage } from './changetimezone';

@NgModule({
  declarations: [
    ChangetimezonePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangetimezonePage),
  ],
})
export class ChangetimezonePageModule {}
