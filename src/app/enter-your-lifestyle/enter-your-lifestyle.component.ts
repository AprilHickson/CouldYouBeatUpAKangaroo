import { Component, OnInit } from '@angular/core';
import { faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {
  LifestyleOptionList,
  FormService,
  LifestyleOption,
} from '../form.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-enter-your-lifestyle',
  templateUrl: './enter-your-lifestyle.component.html',
  styleUrls: ['./enter-your-lifestyle.component.scss'],
})
export class EnterYourLifestyleComponent implements OnInit {
  faArrowRight = faArrowRight;
  faCheckCircle = faCheckCircle;

  LifestyleOptionList = Object.keys(LifestyleOptionList);

  get quizForm() {
    return this.formService.form;
  }

  constructor(private formService: FormService) {}

  canClickNext$: Observable<boolean> = this.quizForm
    .get('lifestyle')
    .valueChanges.pipe(
      startWith(0),
      map((lifestyle) => !!lifestyle)
    );

  ngOnInit(): void {}

  moveToNextStep(): void {
    this.formService.currentStep = this.formService.currentStep + 1;
  }

  isSelected(option: LifestyleOption) {
    return this.quizForm.value.lifestyle === option;
  }

  optionClicked(option: LifestyleOption) {
    this.quizForm.patchValue({
      lifestyle: option,
    });
  }
}
