import { Component, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormService } from '../form.service';

@Component({
  selector: 'app-enter-your-weight',
  templateUrl: './enter-your-weight.component.html',
  styleUrls: ['./enter-your-weight.component.scss'],
})
export class EnterYourWeightComponent implements OnInit {
  faArrowRight = faArrowRight;

  get quizForm() {
    return this.formService.form;
  }

  canClickNext$: Observable<boolean> = this.quizForm
    .get('weight')
    .valueChanges.pipe(
      startWith(0),
      map((weight) => !!weight)
    );

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  moveToNextStep(): void {
    if (!!this.quizForm.value.weight) {
      this.formService.currentStep = this.formService.currentStep + 1;
    }
  }
}
