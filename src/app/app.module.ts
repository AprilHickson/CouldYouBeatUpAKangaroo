import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnterYourNameComponent } from './enter-your-name/enter-your-name.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormService } from './form.service';
import { EnterYourAgeComponent } from './enter-your-age/enter-your-age.component';
import { OnlyNumber } from './directives/OnlyNumber.directive';
import { EnterYourHeightComponent } from './enter-your-height/enter-your-height.component';
import { EnterYourWeightComponent } from './enter-your-weight/enter-your-weight.component';
import { EnterYourSelfRatingComponent } from './enter-your-self-rating/enter-your-self-rating.component';
import { EnterYourFootSizeComponent } from './enter-your-foot-size/enter-your-foot-size.component';
import { EnterYourLifestyleComponent } from './enter-your-lifestyle/enter-your-lifestyle.component';
import { SelectTheWordsThatDescribeYouComponent } from './select-the-words-that-describe-you/select-the-words-that-describe-you.component';
import { ResultsViewComponent } from './results-view/results-view.component';
import { ShowScoreComponent } from './show-score/show-score.component';
import { AutofocusDirective } from './directives/AutoFocus.directive';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [
    AppComponent,
    EnterYourNameComponent,
    EnterYourAgeComponent,
    OnlyNumber,
    AutofocusDirective,
    EnterYourHeightComponent,
    EnterYourWeightComponent,
    EnterYourSelfRatingComponent,
    EnterYourFootSizeComponent,
    EnterYourLifestyleComponent,
    SelectTheWordsThatDescribeYouComponent,
    ResultsViewComponent,
    ShowScoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8166070067850151',
    }),
  ],
  exports: [OnlyNumber, AutofocusDirective],
  providers: [FormService],
  bootstrap: [AppComponent],
})
export class AppModule {}
