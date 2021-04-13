import { Component, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormService } from '../form.service';

@Component({
  selector: 'app-enter-your-self-rating',
  templateUrl: './enter-your-self-rating.component.html',
  styleUrls: ['./enter-your-self-rating.component.scss'],
})
export class EnterYourSelfRatingComponent implements OnInit {
  faArrowRight = faArrowRight;

  get quizForm() {
    return this.formService.form;
  }

  canClickNext$: Observable<boolean> = this.quizForm
    .get('selfRating')
    .valueChanges.pipe(
      startWith(0),
      map((selfRating) => !!selfRating)
    );

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  moveToNextStep(): void {
    if (!!this.quizForm.value.selfRating) {
      this.formService.currentStep = this.formService.currentStep + 1;
    }
  }
}
