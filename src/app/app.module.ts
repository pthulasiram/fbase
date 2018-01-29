import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// AngularFire2
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// chart.js
import { ChartsModule } from 'ng2-charts';
// material
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

// services
import { ResultService } from './poll/result.service';
import { PollService } from './poll/poll.service';

// components
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { PollEditComponent } from './poll/poll-edit/poll-edit.component';
import { PollListComponent } from './poll/poll-list/poll-list.component';
import { PollDetailComponent } from './poll/poll-detail/poll-detail.component';
import { PollResultComponent } from './poll/poll-result/poll-result.component';
import { ChartComponent } from './chart/chart.component';
import { LoaddingComponent } from './loadding/loadding.component';
import { ChartService } from './chart.service';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
//
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SeoService } from './seo.service';
import { AboutComponent } from './about/about.component';
import { LangTranslatorPipe } from './lang-translator.pipe';
import { LangTranslatorService } from './lang-translator.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { ShareButtonsOptions } from '@ngx-share/core';
import { ShareButtonsModule } from '@ngx-share/buttons';

const options: ShareButtonsOptions = {
  include: ['facebook', 'twitter', 'google'],
  exclude: ['tumblr', 'stumble', 'vk'],
  theme: 'modern-light',
  gaTracking: true,
  twitterAccount: 'twitterUsername'
};

@NgModule({
  declarations: [
    AppComponent,
    PollEditComponent,
    PollListComponent,
    PollDetailComponent,
    PollResultComponent,
    ChartComponent,
    LoaddingComponent,
    ProgressBarComponent,
    AboutComponent,
    LangTranslatorPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    NoopAnimationsModule,
    MatChipsModule,
    MatProgressBarModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ChartsModule,
    NgxChartsModule,
    HttpClientModule,      // (Required) for share counts
    HttpClientJsonpModule, // (Optional) For linkedIn & Tumblr counts
    ShareButtonsModule.forRoot()
  ],
  providers: [PollService, ResultService, ChartService, SeoService, LangTranslatorService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
