import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';

@Component({
  selector: 'app-show-score',
  templateUrl: './show-score.component.html',
  styleUrls: ['./show-score.component.scss'],
})
export class ShowScoreComponent implements OnInit {
  constructor(private formService: FormService) {}

  get isApril(): boolean {
    return this.formService.isApril;
  }

  get ageScore() {
    if (this.isApril) {
      return 10;
    }
    return this.formService.getAgeScore();
  }

  get heightScore() {
    if (this.isApril) {
      return 10;
    }
    return this.formService.getHeightScore();
  }

  get weightScore() {
    if (this.isApril) {
      return 10;
    }
    return this.formService.getWeightScore();
  }

  get footSizeScore() {
    if (this.isApril) {
      return 10;
    }
    return this.formService.getFootSizeScore();
  }

  get lifestyleScore() {
    if (this.isApril) {
      return 10;
    }
    return this.formService.getLifeStyleScore();
  }

  get wordsScore() {
    if (this.isApril) {
      return 10;
    }
    return this.formService.getWordToDescribeYouScore();
  }

  get selfRatingScore() {
    if (this.isApril) {
      return 10;
    }
    return this.formService.getSelfScoreScore();
  }

  ngOnInit(): void {}
}
