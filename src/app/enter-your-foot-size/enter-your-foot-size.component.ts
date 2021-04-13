import { Component, OnInit } from '@angular/core';
import { faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FormService, FootSizeUnitsList } from '../form.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-enter-your-foot-size',
  templateUrl: './enter-your-foot-size.component.html',
  styleUrls: ['./enter-your-foot-size.component.scss'],
})
export class EnterYourFootSizeComponent implements OnInit {
  faArrowRight = faArrowRight;
  faArrowDown = faArrowDown;

  FootSizeUnitsList = Object.keys(FootSizeUnitsList);

  get quizForm() {
    return this.formService.form;
  }
  constructor(private formService: FormService) {}

  canClickNext$: Observable<boolean> = this.quizForm
    .get('footSize')
    .valueChanges.pipe(
      startWith(0),
      map((footSize) => !!footSize)
    );

  ngOnInit(): void {}

  moveToNextStep(): void {
    if (!!this.quizForm.value.footSize) {
      this.formService.currentStep = this.formService.currentStep + 1;
    }
  }
}
