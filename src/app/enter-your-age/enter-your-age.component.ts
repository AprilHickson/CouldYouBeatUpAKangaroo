import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-enter-your-age',
  templateUrl: './enter-your-age.component.html',
  styleUrls: ['./enter-your-age.component.scss'],
})
export class EnterYourAgeComponent implements OnInit {
  faArrowRight = faArrowRight;

  get quizForm() {
    return this.formService.form;
  }
  constructor(private formService: FormService) {}

  canClickNext$: Observable<boolean> = this.quizForm
    .get('age')
    .valueChanges.pipe(
      startWith(0),
      map((age) => !!age)
    );

  ngOnInit(): void {}

  moveToNextStep(): void {
    if (!!this.quizForm.value.age) {
      this.formService.currentStep = this.formService.currentStep + 1;
    }
  }
}
