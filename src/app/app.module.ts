import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyStorage } from '../app/localstorage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { LogoutPage } from '../pages/logout/logout';
import { RegistrationchoicePage } from '../pages/registrationchoice/registrationchoice';
import { SchoolregisterPage } from '../pages/schoolregister/schoolregister';
import { Schoolregister1Page } from '../pages/schoolregister1/schoolregister1';
import { Schoolregister2Page } from '../pages/schoolregister2/schoolregister2';
import { Schoolregister3Page } from '../pages/schoolregister3/schoolregister3';
import { TeacherregisterPage } from '../pages/teacherregister/teacherregister';
import { Teacherregister1Page } from '../pages/teacherregister1/teacherregister1';
import { Teacherregister2Page } from '../pages/teacherregister2/teacherregister2';
import { Teacherregister3Page } from '../pages/teacherregister3/teacherregister3';

import { MyTools } from '../providers/tools';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Services } from '../assets/providers/services';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ForgotpasswordPage,
    LogoutPage,
    RegistrationchoicePage,
    SchoolregisterPage,
    Schoolregister1Page,
    Schoolregister2Page,
    Schoolregister3Page,
    TeacherregisterPage,
    Teacherregister1Page,
    Teacherregister2Page,
    Teacherregister3Page,
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ForgotpasswordPage,
    LogoutPage,
    RegistrationchoicePage,
    SchoolregisterPage,
    Schoolregister1Page,
    Schoolregister2Page,
    Schoolregister3Page,
    TeacherregisterPage,
    Teacherregister1Page,
    Teacherregister2Page,
    Teacherregister3Page,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Services,
    MyStorage,
    // Facebook,
    // GooglePlus,
    MyTools,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
