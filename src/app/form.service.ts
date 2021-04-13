import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from 'ngx-strongly-typed-forms';
import { strEnum } from './helpers/enum.function';

@Injectable()
export class FormService {
  public currentStep = 0;

  public form: FormGroup<CouldYouBeatUpAKangarooQuiz> = this.formBuilder.group<
    CouldYouBeatUpAKangarooQuiz
  >({
    name: undefined,
    age: undefined,
    height: undefined,
    weight: undefined,
    footSize: undefined,
    footSizeUnit: 'UK',
    lifestyle: undefined,
    wordsToDescribeYou: [],
    selfRating: undefined,
  });

  constructor(private formBuilder: FormBuilder) {
    this.form.valueChanges.subscribe((v) => {
      if (v.footSizeUnit === null) {
        this.form.patchValue({
          footSizeUnit: 'UK',
          wordsToDescribeYou: [],
        });
      }
    });

    this.form.patchValue({
      wordsToDescribeYou: [],
    });

    this.form.markAsPristine();
  }

  get isApril(): boolean {
    if (this.form.value.name === null) {
      return false;
    }

    return this.form.value.name.toLowerCase().includes('april');
  }

  getIfCould(): boolean {
    const formValue = this.form.value;
    if (!!formValue.name) {
      if (this.isApril) {
        return true;
      }
    }

    let value = 0;

    value = value + this.getAgeScore();

    value = value + this.getHeightScore();

    value = value + this.getWeightScore();

    value = value + this.getFootSizeScore();

    value = value + this.getLifeStyleScore();

    value = value + this.getWordToDescribeYouScore();

    value = value + this.getSelfScoreScore();

    if (value > 60) {
      return true;
    }

    return false;
  }

  getAgeScore(): number {
    if (this.form.value.age === null) {
      return 0;
    }

    return this.getLogScore(18, 25, this.form.value.age);
  }

  getHeightScore() {
    if (this.form.value.height === null) {
      return 0;
    }
    return this.getLogScore(165, 200, this.form.value.height);
  }

  getWeightScore() {
    if (this.form.value.weight === null) {
      return 0;
    }

    const idealWeight = (22.5 * this.form.value.height ** 2) / 10000;
    const overweightNotObeseWeight = (30 * this.form.value.height ** 2) / 10000;

    return this.getLogScore(
      idealWeight,
      overweightNotObeseWeight,
      this.form.value.weight
    );
  }

  getFootSizeScore() {
    //American size 9. is average
    // Cap at 13
    if (this.form.value.footSize === null) {
      return 0;
    }
    if (this.form.value.footSize <= 0) {
      return 0;
    }

    let idealNumber = 0;
    let capNumber = 0;

    switch (this.form.value.footSizeUnit) {
      case 'UK':
        idealNumber = 8.5;
        capNumber = 12.5;
        break;
      case 'EURO':
        idealNumber = 42;
        capNumber = 47;
        break;
      case 'JPN':
        idealNumber = 26;
        capNumber = 29.4;
        break;
      case 'US':
        idealNumber = 9;
        capNumber = 13;
        break;
    }

    return this.getLogScore(idealNumber, capNumber, this.form.value.footSize);
  }

  getLifeStyleScore() {
    if (this.form.value.footSize === null) {
      return 0;
    }
    switch (this.form.value.lifestyle) {
      case 'A person who says they will go for a run but actually will forget their kit on the day.':
        return 0;
      case 'Gym Bro':
        return 10;
      case 'Lazy Bones':
        return 3;
      case 'Marathon Runner':
        return 7;
    }
    return 0;
  }

  getWordToDescribeYouScore() {
    const words = this.form.value.wordsToDescribeYou;

    let score = 0;

    if (words.includes('Angry')) {
      score = score + 3;
    }

    if (words.includes('Animalistic')) {
      score = score + 3;
    }

    if (words.includes('Chub')) {
      score = score - 5;
    }

    if (words.includes('Confident')) {
      score = score + 5;
    }

    if (words.includes('Crazy')) {
      score = score + 1;
    }

    if (words.includes('Dairy')) {
      score = score - 2;
    }

    if (words.includes('Lazy')) {
      score = score - 2;
    }

    if (words.includes('Lost')) {
      score = score - 5;
    }

    if (words.includes('Strong')) {
      score = score + 5;
    }

    if (score > 10) {
      return 10;
    }
    return score;
  }

  getSelfScoreScore() {
    if (this.form.value.selfRating === null) {
      return 0;
    }

    const selfRating = this.form.value.selfRating;

    if (selfRating > 112) {
      return 0;
    }
    if (selfRating > 10) {
      return 10;
    }
    return selfRating;
  }

  getLogScore(idealNumber: number, capNumber: number, actualNumber: number) {
    let logAge = Math.log(Math.abs(actualNumber - idealNumber));

    if (!isFinite(logAge)) {
      logAge = 0;
    }

    logAge = 2.22 * logAge;

    logAge = Math.abs(logAge - 10);

    if (actualNumber <= capNumber) {
      logAge = logAge + 5;
    }

    if (logAge > 10) {
      logAge = 10;
    }

    return logAge;
  }
}

export interface CouldYouBeatUpAKangarooQuiz {
  name: string;
  age: number;
  height: number;
  weight: number;
  footSize: number;
  footSizeUnit: FootSizeUnits;
  lifestyle: LifestyleOption;
  wordsToDescribeYou: WordToDescribeYouOption[];
  selfRating: number;
}

export const FootSizeUnitsList = strEnum(['UK', 'EURO', 'US', 'JPN']);
export type FootSizeUnits = keyof typeof FootSizeUnitsList;

export const LifestyleOptionList = strEnum([
  'Lazy Bones',
  'Marathon Runner',
  'Gym Bro',
  'A person who says they will go for a run but actually will forget their kit on the day.',
]);
export type LifestyleOption = keyof typeof LifestyleOptionList;

export const WordToDescribeYouOptionList = strEnum([
  'Lazy',
  'Strong',
  'Confident',
  'Angry',
  'Animalistic',
  'Crazy',
  'Chub',
  'Dairy',
  'Lost',
]);
export type WordToDescribeYouOption = keyof typeof WordToDescribeYouOptionList;
