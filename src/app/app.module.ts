import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64';
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
import { Teacherregister1Page } from '../pages/teacherregister1/teacherregister1';
import { Teacherregister2Page } from '../pages/teacherregister2/teacherregister2';
import { Teacherregister3Page } from '../pages/teacherregister3/teacherregister3';
import { Teacherregister4Page } from '../pages/teacherregister4/teacherregister4';
import { FavouritesPage } from '../pages/favourites/favourites';
import { SettingsPage } from '../pages/settings/settings';
import { VerifyphonePage } from '../pages/verifyphone/verifyphone';
import { MyTools } from '../providers/tools';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Services } from '../assets/providers/services';
import { HttpModule } from '@angular/http';
import { Chooser } from '@ionic-native/chooser';
import { VerifyteacherphonePage } from '../pages/verifyteacherphone/verifyteacherphone';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { PhonenumberschoolPage } from '../pages/phonenumberschool/phonenumberschool';
import { PhonenumberteacherPage } from '../pages/phonenumberteacher/phonenumberteacher';
import { SchoolprofilePage } from '../pages/schoolprofile/schoolprofile';
import { TeacherprofilePage } from '../pages/teacherprofile/teacherprofile';
import { PublicprofilePage } from '../pages/publicprofile/publicprofile';
import { NotificationPage } from '../pages/notification/notification';
import { PaymentPage } from '../pages/payment/payment';
import { ChatPage } from '../pages/chat/chat';
import { TeacherreviewsPage } from '../pages/teacherreviews/teacherreviews';
import { AddreviewPage } from '../pages/addreview/addreview';
import { ListreviewPage } from '../pages/listreview/listreview';
import { FiltersPage } from '../pages/filters/filters';
import { BlocklistPage } from '../pages/blocklist/blocklist';
import { BookinglistPage } from '../pages/bookinglist/bookinglist';
import { RegisterrPage } from '../pages/registerr/registerr';
import { HelpPage } from '../pages/help/help';
import { RechtlichesPage } from '../pages/rechtliches/rechtliches';
import { FaqPage } from '../pages/faq/faq';
import { TermsPage } from '../pages/terms/terms';
import { HTTP } from '@ionic-native/http';
import { DocumentViewer  } from '@ionic-native/document-viewer';
import { Stripe } from '@ionic-native/stripe';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
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
    Teacherregister1Page,
    Teacherregister2Page,
    Teacherregister3Page,
    FavouritesPage,
    SettingsPage,
    VerifyphonePage,
    VerifyteacherphonePage,
    Teacherregister4Page,
    EditprofilePage,
    PhonenumberschoolPage,
    PhonenumberteacherPage,
    SchoolprofilePage,
    TeacherprofilePage,
    PublicprofilePage,
    NotificationPage,
    PaymentPage,
    ChatPage,
    FiltersPage,
    TeacherreviewsPage,
    AddreviewPage,
    ListreviewPage,
    BlocklistPage,
    BookinglistPage,
    RegisterrPage,
    HelpPage,
    RechtlichesPage,
    FaqPage,
    TermsPage,
  ],
  imports: [ 
    FormsModule, 
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
    Teacherregister1Page,
    Teacherregister2Page,
    Teacherregister3Page,
    FavouritesPage,
    SettingsPage,
    VerifyphonePage,
    VerifyteacherphonePage,
    Teacherregister4Page,
    EditprofilePage,
    PhonenumberschoolPage,
    PhonenumberteacherPage,
    SchoolprofilePage,
    TeacherprofilePage,
    PublicprofilePage,
    NotificationPage,
    PaymentPage,
    ChatPage,
    FiltersPage,
    TeacherreviewsPage,
    AddreviewPage,
    ListreviewPage,
    BlocklistPage,
    BookinglistPage,
    RegisterrPage,
    HelpPage,
    RechtlichesPage,
    FaqPage,
    TermsPage,
  ],
  providers: [
    
    StatusBar,
    SplashScreen,
    Services,
    MyStorage,
    Facebook,
    GooglePlus,
    MyTools,
    Base64,
    Chooser,
    HTTP,
    Push,
    Stripe,
    DocumentViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
