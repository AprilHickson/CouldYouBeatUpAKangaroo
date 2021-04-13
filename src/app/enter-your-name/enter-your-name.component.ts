import { Component, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FormService } from '../form.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-enter-your-name',
  templateUrl: './enter-your-name.component.html',
  styleUrls: ['./enter-your-name.component.scss'],
})
export class EnterYourNameComponent implements OnInit {
  faArrowRight = faArrowRight;

  get quizForm() {
    return this.formService.form;
  }

  buttonText$: Observable<string> = this.quizForm.get('name').valueChanges.pipe(
    startWith(''),
    map((name) => (name.length > 0 ? 'Next' : 'Skip'))
  );

  canClickNext$: Observable<boolean> = this.quizForm
    .get('name')
    .valueChanges.pipe(
      startWith(''),
      map((name) => name.length > 0)
    );

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  moveToNextStep(): void {
    this.formService.currentStep = this.formService.currentStep + 1;
  }
}
