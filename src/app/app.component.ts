import { Component } from '@angular/core';
import { FormService } from './form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CouldYouBeatUpAKangaroo';

  get currentStep(): number {
    return this.formService.currentStep;
  }

  constructor(private formService: FormService) {}
}
