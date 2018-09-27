import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherprofilePage } from './teacherprofile';

@NgModule({
  declarations: [
    TeacherprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherprofilePage),
  ],
})
export class TeacherprofilePageModule {}
