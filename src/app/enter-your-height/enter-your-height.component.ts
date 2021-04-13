import { Component, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FormService } from '../form.service';
import { Observable } from 'rxjs';
import { startWith, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-enter-your-height',
  templateUrl: './enter-your-height.component.html',
  styleUrls: ['./enter-your-height.component.scss'],
})
export class EnterYourHeightComponent implements OnInit {
  faArrowRight = faArrowRight;

  get quizForm() {
    return this.formService.form;
  }
  constructor(private formService: FormService) {}

  canClickNext$: Observable<boolean> = this.quizForm
    .get('height')
    .valueChanges.pipe(
      startWith(0),
      map((height) => !!height)
    );

  ngOnInit(): void {}

  moveToNextStep(): void {
    if (!!this.quizForm.value.height) {
      this.formService.currentStep = this.formService.currentStep + 1;
    }
  }
}
