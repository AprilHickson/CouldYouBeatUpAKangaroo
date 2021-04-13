import { Component, OnInit } from '@angular/core';
import { faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {
  WordToDescribeYouOptionList,
  FormService,
  LifestyleOption,
  WordToDescribeYouOption,
} from '../form.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-select-the-words-that-describe-you',
  templateUrl: './select-the-words-that-describe-you.component.html',
  styleUrls: ['./select-the-words-that-describe-you.component.scss'],
})
export class SelectTheWordsThatDescribeYouComponent implements OnInit {
  faArrowRight = faArrowRight;
  faCheckCircle = faCheckCircle;

  WordToDescribeYouOptionList = Object.keys(WordToDescribeYouOptionList);

  get quizForm() {
    return this.formService.form;
  }

  constructor(private formService: FormService) {}

  canClickNext$: Observable<boolean> = this.quizForm
    .get('wordsToDescribeYou')
    .valueChanges.pipe(
      startWith([]),
      map((wordsToDescribeYou) => wordsToDescribeYou.length > 0)
    );

  ngOnInit(): void {}

  moveToNextStep(): void {
    this.formService.currentStep = this.formService.currentStep + 1;
  }

  isSelected(option: WordToDescribeYouOption) {
    return this.quizForm.value.wordsToDescribeYou.includes(option);
  }

  optionClicked(option: WordToDescribeYouOption) {
    let list: WordToDescribeYouOption[] = this.quizForm.value
      .wordsToDescribeYou;

    if (list.includes(option)) {
      list = list.filter((w) => w !== option);
    } else {
      list.push(option);
    }
    this.quizForm.patchValue({
      wordsToDescribeYou: list,
    });
  }
}
